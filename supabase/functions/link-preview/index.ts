/**
 * link-preview — Supabase Edge Function (Deno)
 *
 * POST { "url": string }  ->  { "thumbnailUrl": string|null, "title": string|null, "reason": string|null }
 * reason: blocked_url | fetch_failed | timeout | not_html | no_image | null (success)
 *
 * Auth:
 *   - verify_jwt stays ON (platform default): the gateway rejects requests without a valid JWT/key.
 *   - Inside the function, verifyAuth({ auth: 'user' }) from @supabase/server re-verifies the
 *     caller's JWT and we additionally require role === "authenticated" (so the anon key alone
 *     is not enough). No service/secret key, no database access, no custom secrets.
 *
 * Limits:
 *   - Request body: max 8 KB. Input URL: max 2048 chars, https only, port 443 only,
 *     no userinfo, no IP literals, no localhost / .local / .internal / .localhost / .lan.
 *   - Every hostname (initial + each redirect target) is DNS-resolved (A + AAAA); any
 *     non-public address -> blocked_url.
 *   - Max 3 redirects, each re-validated.
 *   - 6 second total timeout (DNS + fetch + body read).
 *   - Only text/html or application/xhtml responses are read.
 *   - Body read as a stream, stopped after 512 KB or once </head> is seen.
 *   - Title cut to 200 characters; image URL must be https and at most 2048 chars.
 *   - The image itself is never fetched.
 *
 * Logging:
 *   - Logs the outcome string only (e.g. ok, blocked_url, timeout, no_image, unauthorized).
 *     fetch_failed may carry a short internal detail from a fixed set, e.g.
 *     "fetch_failed:http_403" or "fetch_failed:too_many_redirects". The detail is logged only,
 *     never returned to the caller. No hostnames, URLs, queries or user info are ever logged.
 *
 * TODO: per-user rate limiting is NOT implemented yet.
 */

import { verifyAuth } from "npm:@supabase/server@1/core";

// ---- Configuration ---------------------------------------------------------

const ALLOWED_ORIGIN = "https://damdabox.github.io";

const MAX_URL_LENGTH = 2048;
const MAX_REQUEST_BODY_CHARS = 8 * 1024;
const MAX_REDIRECTS = 3;
const TOTAL_TIMEOUT_MS = 6000;
const MAX_HTML_BYTES = 512 * 1024;
const MAX_TITLE_LENGTH = 200;
const USER_AGENT = "LinkPreviewBot/1.0";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  // The four headers supabase.functions.invoke always sends, plus the extra ones
  // newer supabase-js versions add (per Supabase's CORS guide). Without those extras
  // the browser preflight would fail on recent SDK versions.
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info, x-retry-count, traceparent, tracestate, baggage",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
};

// ---- Types -----------------------------------------------------------------

type Reason =
  | "blocked_url"
  | "fetch_failed"
  | "timeout"
  | "not_html"
  | "no_image";

interface PreviewResult {
  thumbnailUrl: string | null;
  title: string | null;
  reason: Reason | null;
}

/**
 * Short internal detail for log lines only. Always one of a fixed set of strings
 * (never derived from hostnames, URLs or response content), and never sent to callers.
 */
type FailureDetail =
  | "http_403"
  | "http_404"
  | "http_429"
  | "http_4xx"
  | "http_5xx"
  | "http_other"
  | "too_many_redirects"
  | "redirect_no_location";

class PreviewError extends Error {
  constructor(public reason: Reason, public detail: FailureDetail | null = null) {
    super(reason);
  }
}

function httpStatusDetail(status: number): FailureDetail {
  if (status === 403) return "http_403";
  if (status === 404) return "http_404";
  if (status === 429) return "http_429";
  if (status >= 500 && status < 600) return "http_5xx";
  if (status >= 400 && status < 500) return "http_4xx";
  return "http_other";
}

// ---- Helpers: responses & logging ------------------------------------------

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function result(
  reason: Reason | null,
  thumbnailUrl: string | null = null,
  title: string | null = null,
): PreviewResult {
  return { thumbnailUrl, title, reason };
}

/** Logs only an outcome string — never hostnames, URLs, queries or user info. */
function logOutcome(outcome: string): void {
  try {
    console.log(JSON.stringify({ fn: "link-preview", outcome }));
  } catch {
    // ignore logging failures
  }
}

// ---- IP address classification ---------------------------------------------

function parseIPv4(s: string): number[] | null {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(s);
  if (!m) return null;
  const bytes = m.slice(1).map(Number);
  return bytes.every((b) => b >= 0 && b <= 255) ? bytes : null;
}

/** Parses an IPv6 address (optionally bracketed, optional dotted IPv4 tail) into 8 groups. */
function parseIPv6(input: string): number[] | null {
  let s = input;
  if (s.startsWith("[") && s.endsWith("]")) s = s.slice(1, -1);
  if (s.includes("%")) return null; // zone ids not accepted
  if (!s.includes(":")) return null;

  // Handle an embedded IPv4 tail (e.g. ::ffff:1.2.3.4)
  let tail: number[] = [];
  const lastColon = s.lastIndexOf(":");
  const lastPart = s.slice(lastColon + 1);
  if (lastPart.includes(".")) {
    const v4 = parseIPv4(lastPart);
    if (!v4) return null;
    tail = [(v4[0] << 8) | v4[1], (v4[2] << 8) | v4[3]];
    // Drop the IPv4 tail, keeping a trailing "::" if present ("::ffff:1.2.3.4" -> "::ffff").
    const prefix = s.slice(0, lastColon + 1);
    s = prefix.endsWith("::") ? prefix : prefix.slice(0, -1);
  }

  const doubleColon = s.split("::");
  if (doubleColon.length > 2) return null;

  const toGroups = (part: string): number[] | null => {
    if (part === "") return [];
    const out: number[] = [];
    for (const g of part.split(":")) {
      if (!/^[0-9a-fA-F]{1,4}$/.test(g)) return null;
      out.push(parseInt(g, 16));
    }
    return out;
  };

  const needed = 8 - tail.length;
  let groups: number[];
  if (doubleColon.length === 2) {
    const head = toGroups(doubleColon[0]);
    const rest = toGroups(doubleColon[1]);
    if (!head || !rest) return null;
    const zeros = needed - head.length - rest.length;
    if (zeros < 1) return null;
    groups = [...head, ...new Array(zeros).fill(0), ...rest];
  } else {
    const all = toGroups(s);
    if (!all || all.length !== needed) return null;
    groups = all;
  }
  groups = [...groups, ...tail];
  return groups.length === 8 ? groups : null;
}

// Non-public IPv4 ranges: [network, prefixLength]
const BLOCKED_V4: Array<[string, number]> = [
  ["0.0.0.0", 8], // "this network" / unspecified
  ["10.0.0.0", 8], // private
  ["100.64.0.0", 10], // CGNAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local
  ["172.16.0.0", 12], // private
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.0.2.0", 24], // TEST-NET-1
  ["192.88.99.0", 24], // 6to4 relay anycast (deprecated)
  ["192.168.0.0", 16], // private
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // TEST-NET-2
  ["203.0.113.0", 24], // TEST-NET-3
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved + broadcast
];

function v4ToInt(b: number[]): number {
  return ((b[0] << 24) >>> 0) + (b[1] << 16) + (b[2] << 8) + b[3];
}

const BLOCKED_V4_PARSED = BLOCKED_V4.map(([net, len]) => {
  const mask = len === 0 ? 0 : (0xffffffff << (32 - len)) >>> 0;
  return { net: (v4ToInt(parseIPv4(net)!) & mask) >>> 0, mask };
});

function isBlockedIPv4(bytes: number[]): boolean {
  const ip = v4ToInt(bytes);
  return BLOCKED_V4_PARSED.some(({ net, mask }) => ((ip & mask) >>> 0) === net);
}

function isBlockedIPv6(g: number[]): boolean {
  const embeddedV4 = (): number[] => [g[6] >> 8, g[6] & 0xff, g[7] >> 8, g[7] & 0xff];

  // IPv4-mapped ::ffff:0:0/96 -> judge by the embedded IPv4 address
  if (g[0] === 0 && g[1] === 0 && g[2] === 0 && g[3] === 0 && g[4] === 0 && g[5] === 0xffff) {
    return isBlockedIPv4(embeddedV4());
  }
  // NAT64 well-known prefix 64:ff9b::/96 -> judge by the embedded IPv4 address
  if (g[0] === 0x64 && g[1] === 0xff9b && g[2] === 0 && g[3] === 0 && g[4] === 0 && g[5] === 0) {
    return isBlockedIPv4(embeddedV4());
  }
  // Allow only global unicast 2000::/3. This rejects ::, ::1, IPv4-compatible ::/96,
  // 64:ff9b:1::/48, 100::/64, fc00::/7 (ULA), fe80::/10 (link-local),
  // fec0::/10 (site-local), ff00::/8 (multicast), and everything else reserved.
  if ((g[0] & 0xe000) !== 0x2000) return true;
  // Reserved/special blocks inside 2000::/3
  if (g[0] === 0x2001 && g[1] < 0x0200) return true; // 2001::/23 IETF (incl. Teredo 2001::/32)
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // 2001:db8::/32 documentation
  if (g[0] === 0x2002) return true; // 2002::/16 6to4 (can embed private IPv4)
  if (g[0] === 0x3fff && g[1] < 0x1000) return true; // 3fff::/20 documentation
  return false;
}

/** True when an address string from DNS is NOT a safe public address. */
function isBlockedAddress(addr: string): boolean {
  const v4 = parseIPv4(addr);
  if (v4) return isBlockedIPv4(v4);
  const v6 = parseIPv6(addr);
  if (v6) return isBlockedIPv6(v6);
  return true; // unparseable -> block
}

function isIpLiteralHost(hostname: string): boolean {
  return (
    hostname.startsWith("[") ||
    hostname.includes(":") ||
    parseIPv4(hostname) !== null ||
    /^[0-9.]+$/.test(hostname) // any all-numeric dotted form
  );
}

// ---- URL validation (step 4) -----------------------------------------------

const BLOCKED_SUFFIXES = [".local", ".internal", ".localhost", ".lan"];

/** Returns the parsed URL if it passes all syntactic/policy checks, else null. */
function validateTargetUrl(raw: string, base?: URL): URL | null {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > MAX_URL_LENGTH) return null;

  let url: URL;
  try {
    url = base ? new URL(raw, base) : new URL(raw);
  } catch {
    return null;
  }
  if (url.href.length > MAX_URL_LENGTH) return null;
  if (url.protocol !== "https:") return null;
  // URL normalizes ":443" away for https, so an empty port means 443.
  if (url.port !== "" && url.port !== "443") return null;
  if (url.username !== "" || url.password !== "") return null;

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host.includes(".")) return null;
  if (isIpLiteralHost(host)) return null;
  if (host === "localhost") return null;
  if (BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) return null;

  return url;
}

// ---- DNS check (step 5) ----------------------------------------------------

/**
 * Resolves A and AAAA records; throws PreviewError("blocked_url") if nothing resolves
 * or ANY address is non-public.
 *
 * NOTE: DNS rebinding between this check and the actual fetch cannot be fully ruled
 * out — fetch() performs its own resolution, and a malicious DNS server could answer
 * differently the second time. This check narrows the window but is not a guarantee.
 */
async function assertPublicHost(hostname: string, signal: AbortSignal): Promise<void> {
  const host = hostname.replace(/\.$/, "");
  const [a, aaaa] = await Promise.allSettled([
    Deno.resolveDns(host, "A", { signal }),
    Deno.resolveDns(host, "AAAA", { signal }),
  ]);
  if (signal.aborted) throw new PreviewError("timeout");

  const addresses: string[] = [];
  if (a.status === "fulfilled") addresses.push(...a.value);
  if (aaaa.status === "fulfilled") addresses.push(...aaaa.value);

  if (addresses.length === 0) throw new PreviewError("blocked_url");
  if (addresses.some(isBlockedAddress)) throw new PreviewError("blocked_url");
}

// ---- Fetching (step 6) -----------------------------------------------------

async function discardBody(res: Response): Promise<void> {
  try {
    await res.body?.cancel();
  } catch {
    // ignore
  }
}

/** Fetches with manual redirects; validates every hop. Returns the final response + URL. */
async function fetchWithChecks(
  start: URL,
  signal: AbortSignal,
): Promise<{ res: Response; finalUrl: URL }> {
  let current = start;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(current.hostname, signal);

    let res: Response;
    try {
      res = await fetch(current.href, {
        method: "GET",
        redirect: "manual",
        signal,
        credentials: "omit",
        // Only these headers are sent. The caller's Authorization / cookies are never forwarded.
        headers: {
          "Accept": "text/html,application/xhtml+xml;q=0.9",
          "Accept-Language": "en",
          "User-Agent": USER_AGENT,
        },
      });
    } catch {
      throw new PreviewError(signal.aborted ? "timeout" : "fetch_failed");
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      await discardBody(res);
      if (!location) throw new PreviewError("fetch_failed", "redirect_no_location");
      if (hop === MAX_REDIRECTS) throw new PreviewError("fetch_failed", "too_many_redirects");
      const next = validateTargetUrl(location, current);
      if (!next) throw new PreviewError("blocked_url");
      current = next;
      continue;
    }

    if (!res.ok) {
      await discardBody(res);
      throw new PreviewError("fetch_failed", httpStatusDetail(res.status));
    }
    return { res, finalUrl: current };
  }
  throw new PreviewError("fetch_failed");
}

// ---- Reading (step 7) ------------------------------------------------------

/** Reads at most MAX_HTML_BYTES, stopping early once </head> appears. */
async function readHead(res: Response, signal: AbortSignal): Promise<string> {
  const contentType = (res.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
    await discardBody(res);
    throw new PreviewError("not_html");
  }
  if (!res.body) return "";

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: false });
  let text = "";
  let bytes = 0;

  try {
    while (bytes < MAX_HTML_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      const remaining = MAX_HTML_BYTES - bytes;
      const chunk = value.byteLength > remaining ? value.subarray(0, remaining) : value;
      bytes += chunk.byteLength;
      // Search only the new text plus a small overlap for a split "</head".
      const searchFrom = Math.max(0, text.length - 6);
      text += decoder.decode(chunk, { stream: true });
      const idx = text.slice(searchFrom).search(/<\/head\s*>/i);
      if (idx !== -1) {
        text = text.slice(0, searchFrom + idx);
        break;
      }
    }
    text += decoder.decode();
  } catch {
    throw new PreviewError(signal.aborted ? "timeout" : "fetch_failed");
  } finally {
    try {
      await reader.cancel();
    } catch {
      // ignore
    }
  }
  return text;
}

// ---- Parsing (step 8) ------------------------------------------------------

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
  bull: "•",
  copy: "©",
  reg: "®",
  trade: "™",
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, (m, body: string) => {
    if (body[0] === "#") {
      const cp = body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      if (!Number.isFinite(cp) || cp <= 0 || cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) {
        return m;
      }
      return String.fromCodePoint(cp);
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? m;
  });
}

/** Parses tag attributes, tolerant of order and of single, double or no quotes. */
function parseAttributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const inner = tag.replace(/^<\s*[a-zA-Z]+/, "").replace(/\/?\s*>$/, "");
  const re = /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner)) !== null) {
    const name = m[1].toLowerCase();
    if (name in attrs) continue; // first occurrence wins
    attrs[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

/** Lowercases ASCII A-Z only, so every index lines up with the original string. */
function asciiLower(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out += c >= 65 && c <= 90 ? String.fromCharCode(c + 32) : s[i];
  }
  return out;
}

/** True for [A-Za-z0-9_] (a regex \w character). NaN (past the end) is false. */
function isWordCharCode(c: number): boolean {
  return (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 95;
}

interface StripMarker {
  open: string; // lowercase opening marker
  close: string; // lowercase closing marker
  isTag: boolean; // tag markers need a word boundary after `open` and allow "\s*>" after `close`
  next: number; // cached index of the next opening at/after the scan position; -1 = none left
}

/** Index of the next real opening marker at or after `from`, or -1. */
function findOpening(lower: string, m: StripMarker, from: number): number {
  for (;;) {
    const i = lower.indexOf(m.open, from);
    if (i === -1) return -1;
    if (!m.isTag || !isWordCharCode(lower.charCodeAt(i + m.open.length))) return i;
    // "<scripts" etc.: not an opening. The marker has only one "<", so resume after it.
    from = i + m.open.length;
  }
}

/** Index just past the closing marker found at or after `from`, or -1. */
function findClosingEnd(lower: string, m: StripMarker, from: number): number {
  for (;;) {
    const i = lower.indexOf(m.close, from);
    if (i === -1) return -1;
    let j = i + m.close.length;
    if (!m.isTag) return j;
    // Skip "\s*" (String.prototype.trim uses the same whitespace set as \s).
    while (j < lower.length && lower[j].trim() === "") j++;
    if (lower[j] === ">") return j + 1;
    // Text in (i, j) is the marker tail plus whitespace and holds no "<", so resume at j.
    from = j;
  }
}

/**
 * Removes HTML comments and <script>/<style> blocks in one forward pass.
 * Each marker's searches only ever move forward, so no text is scanned twice per marker.
 * An opening marker with no closing marker drops everything from it to the end.
 */
function stripIgnoredBlocks(html: string): string {
  const lower = asciiLower(html);
  const markers: StripMarker[] = [
    { open: "<!--", close: "-->", isTag: false, next: -2 },
    { open: "<script", close: "</script", isTag: true, next: -2 },
    { open: "<style", close: "</style", isTag: true, next: -2 },
  ];
  const parts: string[] = [];
  let pos = 0;

  while (pos < html.length) {
    let best: StripMarker | null = null;
    for (const m of markers) {
      // Re-search only when the cached hit is behind the scan position (-2 = not searched yet).
      if (m.next !== -1 && m.next < pos) m.next = findOpening(lower, m, pos);
      if (m.next !== -1 && (best === null || m.next < best.next)) best = m;
    }
    if (best === null) break;

    parts.push(html.slice(pos, best.next));
    const end = findClosingEnd(lower, best, best.next + best.open.length);
    if (end === -1) {
      pos = html.length; // unclosed: drop the rest of the document
      break;
    }
    pos = end;
  }
  if (pos < html.length) parts.push(html.slice(pos));
  return parts.join("");
}

function parseHead(html: string): { images: string[]; title: string | null } {
  // Remove comments and script/style contents so they can't produce false matches.
  const head = stripIgnoredBlocks(html);

  const meta = new Map<string, string>();
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    const a = parseAttributes(m[0]);
    const key = (a["property"] ?? a["name"] ?? "").trim().toLowerCase();
    const content = (a["content"] ?? "").trim();
    if (key && content && !meta.has(key)) meta.set(key, content);
  }

  let linkImage: string | null = null;
  for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
    const a = parseAttributes(m[0]);
    const rels = (a["rel"] ?? "").toLowerCase().split(/\s+/);
    const href = (a["href"] ?? "").trim();
    if (rels.includes("image_src") && href) {
      linkImage = href;
      break;
    }
  }

  const images = [
    meta.get("og:image:secure_url"),
    meta.get("og:image"),
    meta.get("twitter:image"),
    meta.get("twitter:image:src"),
    linkImage ?? undefined,
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  let rawTitle = meta.get("og:title") ?? null;
  if (!rawTitle) {
    const t = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(head);
    rawTitle = t ? decodeEntities(t[1]) : null;
  }
  let title: string | null = null;
  if (rawTitle) {
    const cleaned = rawTitle.replace(/\s+/g, " ").trim();
    const chars = Array.from(cleaned);
    title = (chars.length > MAX_TITLE_LENGTH ? chars.slice(0, MAX_TITLE_LENGTH).join("") : cleaned)
      .trim() || null;
  }

  return { images, title };
}

/** Resolves and validates an image candidate. Returns a safe https URL string or null. */
function normalizeImageUrl(candidate: string, pageUrl: URL): string | null {
  if (candidate.length > MAX_URL_LENGTH) return null;
  let url: URL;
  try {
    url = new URL(candidate, pageUrl);
  } catch {
    return null;
  }
  if (url.protocol === "http:") url.protocol = "https:";
  if (url.protocol !== "https:") return null;
  if (url.username !== "" || url.password !== "") return null;

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  // Same host rules as validateTargetUrl.
  if (!host.includes(".")) return null;
  if (isIpLiteralHost(host)) return null;
  if (host === "localhost") return null;
  if (BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) return null;

  const href = url.href;
  return href.length <= MAX_URL_LENGTH ? href : null;
}

// ---- Main flow -------------------------------------------------------------

/** `detail` is for logging only; callers receive `preview` alone. */
async function buildPreview(
  target: URL,
): Promise<{ preview: PreviewResult; detail: FailureDetail | null }> {
  const signal = AbortSignal.timeout(TOTAL_TIMEOUT_MS);
  try {
    const { res, finalUrl } = await fetchWithChecks(target, signal);
    const html = await readHead(res, signal);
    const { images, title } = parseHead(html);

    for (const candidate of images) {
      const thumb = normalizeImageUrl(candidate, finalUrl);
      if (thumb) return { preview: result(null, thumb, title), detail: null };
    }
    return { preview: result("no_image", null, title), detail: null };
  } catch (err) {
    if (err instanceof PreviewError) return { preview: result(err.reason), detail: err.detail };
    return { preview: result(signal.aborted ? "timeout" : "fetch_failed"), detail: null };
  }
}

async function handler(req: Request): Promise<Response> {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  // Auth: verify_jwt is ON at the gateway; re-verify here and require a signed-in user.
  try {
    const { data: auth, error } = await verifyAuth(req, { auth: "user" });
    if (error || !auth?.userClaims?.id || auth.userClaims.role !== "authenticated") {
      logOutcome("unauthorized");
      return json({ error: "unauthorized" }, 401);
    }
  } catch {
    logOutcome("auth_error");
    return json({ error: "unauthorized" }, 401);
  }

  // Parse input
  let rawUrl: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_REQUEST_BODY_CHARS) throw new Error("too large");
    rawUrl = (JSON.parse(text) as { url?: unknown })?.url;
  } catch {
    logOutcome("bad_input");
    return json(result("blocked_url"), 400);
  }
  if (typeof rawUrl !== "string") {
    logOutcome("bad_input");
    return json(result("blocked_url"), 400);
  }

  const target = validateTargetUrl(rawUrl.trim());
  if (!target) {
    logOutcome("blocked_url");
    return json(result("blocked_url"), 400);
  }

  const { preview, detail } = await buildPreview(target);
  const outcome = preview.reason ?? "ok";
  logOutcome(detail ? `${outcome}:${detail}` : outcome);
  return json(preview, 200);
}

export default {
  fetch: async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch {
      // Last-resort guard: never let an error escape unhandled.
      logOutcome("internal_error");
      return json(result("fetch_failed"), 200);
    }
  },
};
