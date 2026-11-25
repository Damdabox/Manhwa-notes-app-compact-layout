/**
 * delete-account — Supabase Edge Function (Deno)
 *
 * POST (body ignored)  ->  200 { "ok": true }
 * Errors: 401 { error: "unauthorized" | "reauth_required" }, 405 { error: "method_not_allowed" },
 *         500 { error: "storage_cleanup_failed" | "user_delete_failed" | "internal_error" }
 *
 * Permanently deletes the CALLING user's account and data.
 *
 * Safeguards:
 *   - verify_jwt stays ON (platform default): the gateway rejects requests without a valid JWT.
 *   - Inside the function, verifyAuth({ auth: "user" }) from @supabase/server re-verifies the
 *     caller's JWT. We additionally require role === "authenticated" and a user id, so the
 *     anon/publishable key alone is never enough.
 *   - The user to delete comes ONLY from the verified token's claims. The request body is
 *     never read, so a caller cannot name another account.
 *   - Recent sign-in required: the token's `amr` claim must contain a "password" entry
 *     whose timestamp is within the last 10 minutes, and the token's `iat` must be no
 *     older than 24 hours. Otherwise 401 { error: "reauth_required" }.
 *   - POST only (plus OPTIONS preflight). CORS allows a single origin (ALLOWED_ORIGIN).
 *   - The admin client uses the platform-provided secret key (SUPABASE_SECRET_KEYS, via
 *     createAdminClient). The key is never logged, returned, or sent anywhere except to
 *     this project's own Supabase API.
 *   - Order: storage first. If storage cleanup fails, the auth user is NOT deleted, so the
 *     user can retry and no orphaned files are left without an owner. Then the auth user
 *     is deleted. Then any leftover rows in "Entries" and "lists" are removed (the foreign
 *     key cascade should already have done this). No other table is touched.
 *   - Everything up to and including the auth user deletion fails closed. The leftover-rows
 *     step does NOT: once the auth user is deleted, a failure there only logs
 *     "db_cleanup_warning" and the function still returns 200 { ok: true }. The cascade has
 *     already removed the rows, and the user can no longer sign in to retry, so reporting
 *     a failure would be wrong.
 *   - All admin queries are filtered by the verified user id. Storage removal is limited to
 *     paths under "<userId>/" in the "images" bucket.
 *   - Logging: outcome strings only. No user ids, emails, file names or counts are logged.
 *   - Every path returns JSON. A top-level guard catches anything unexpected.
 *
 * Rate limiting: per-user rate limiting is not needed. A successful call deletes the
 * account, so the token's user can no longer authenticate and the function can run at
 * most once per account.
 */

import { createAdminClient, verifyAuth } from "npm:@supabase/server@1/core";

// ---- Configuration ---------------------------------------------------------

const ALLOWED_ORIGIN = "https://damdabox.github.io";

const BUCKET = "images";
const LIST_PAGE_SIZE = 100;
const REMOVE_BATCH_SIZE = 100;
const MAX_TOKEN_AGE_SECONDS = 10 * 60; // max age of the password sign-in recorded in `amr`
const MAX_IAT_AGE_SECONDS = 24 * 60 * 60; // a token issued longer ago than this is never accepted
const CLOCK_SKEW_SECONDS = 60; // tolerate small clock differences for tokens "from the future"
const USER_TABLES = ["Entries", "lists"] as const;

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  // Headers supabase.functions.invoke sends, including the extras newer supabase-js adds.
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info, x-retry-count, traceparent, tracestate, baggage",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
};

// ---- Helpers ---------------------------------------------------------------

type Outcome =
  | "ok"
  | "unauthorized"
  | "reauth_required"
  | "method_not_allowed"
  | "storage_cleanup_failed"
  | "user_delete_failed"
  | "db_cleanup_warning"
  | "internal_error";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

/** Logs only a fixed outcome string — never ids, emails, paths, counts or keys. */
function logOutcome(outcome: Outcome): void {
  try {
    console.log(JSON.stringify({ fn: "delete-account", outcome }));
  } catch {
    // ignore logging failures
  }
}

function fail(outcome: Exclude<Outcome, "ok">, status: number): Response {
  logOutcome(outcome);
  return json({ error: outcome }, status);
}

type AdminClient = ReturnType<typeof createAdminClient>;

class StepError extends Error {}

// ---- Storage cleanup -------------------------------------------------------

/**
 * Recursively lists every file under `<userId>/` in the bucket.
 * Folders come back as entries with id === null; we descend into each.
 * Throws StepError on any listing failure.
 */
async function listUserFiles(admin: AdminClient, userId: string): Promise<string[]> {
  const files: string[] = [];
  const folders: string[] = [userId];
  const seen = new Set<string>();

  while (folders.length > 0) {
    const folder = folders.pop()!;
    if (seen.has(folder)) continue;
    seen.add(folder);

    for (let offset = 0; ; offset += LIST_PAGE_SIZE) {
      const { data, error } = await admin.storage.from(BUCKET).list(folder, {
        limit: LIST_PAGE_SIZE,
        offset,
        sortBy: { column: "name", order: "asc" },
      });
      if (error || !Array.isArray(data)) throw new StepError("list_failed");

      for (const entry of data) {
        if (!entry?.name) continue;
        const path = `${folder}/${entry.name}`;
        if (entry.id === null || entry.id === undefined) {
          folders.push(path); // folder placeholder: descend
        } else {
          files.push(path);
        }
      }
      if (data.length < LIST_PAGE_SIZE) break;
    }
  }

  // Defense in depth: only ever remove paths inside the caller's own folder.
  const prefix = `${userId}/`;
  return files.filter((p) => p.startsWith(prefix));
}

async function removeFiles(admin: AdminClient, paths: string[]): Promise<void> {
  for (let i = 0; i < paths.length; i += REMOVE_BATCH_SIZE) {
    const batch = paths.slice(i, i + REMOVE_BATCH_SIZE);
    const { error } = await admin.storage.from(BUCKET).remove(batch);
    if (error) throw new StepError("remove_failed");
  }
}

// ---- Database verification -------------------------------------------------

/** Removes any rows the FK cascade left behind in the user's tables. Throws StepError on failure. */
async function ensureRowsGone(admin: AdminClient, userId: string): Promise<void> {
  for (const table of USER_TABLES) {
    const { count, error } = await admin
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    if (error) throw new StepError("count_failed");

    if ((count ?? 0) > 0) {
      const { error: delError } = await admin.from(table).delete().eq("user_id", userId);
      if (delError) throw new StepError("delete_failed");
    }
  }
}

// ---- Handler ---------------------------------------------------------------

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return fail("method_not_allowed", 405);
  }
  // The request body is intentionally never read.

  // 1. Auth: re-verify the token and require an authenticated user with a recent sign-in.
  let userId: string;
  try {
    const { data: auth, error } = await verifyAuth(req, { auth: "user" });
    const id = auth?.userClaims?.id;
    if (
      error || !auth || typeof id !== "string" || id.length === 0 ||
      auth.userClaims?.role !== "authenticated" ||
      auth.jwtClaims?.sub !== id
    ) {
      return fail("unauthorized", 401);
    }

    // Recent sign-in check.
    // `iat` alone is NOT proof of a recent password sign-in: when supabase-js refreshes a
    // session (roughly hourly), the new access token gets a fresh `iat`, while the time the
    // user actually entered their password stays unchanged in `amr`. So the 10-minute
    // window is checked against the "password" entry in `amr`. `iat` is kept as an extra
    // condition: a token issued more than 24 hours ago is never acceptable.
    const now = Math.floor(Date.now() / 1000);
    const isRecent = (t: unknown, maxAge: number): boolean =>
      typeof t === "number" && Number.isFinite(t) &&
      now - t <= maxAge && t - now <= CLOCK_SKEW_SECONDS;

    const amr = auth.jwtClaims?.amr;
    const hasRecentPasswordSignIn = Array.isArray(amr) && amr.some((entry: unknown) =>
      typeof entry === "object" && entry !== null &&
      (entry as { method?: unknown }).method === "password" &&
      isRecent((entry as { timestamp?: unknown }).timestamp, MAX_TOKEN_AGE_SECONDS)
    );

    if (!hasRecentPasswordSignIn || !isRecent(auth.jwtClaims?.iat, MAX_IAT_AGE_SECONDS)) {
      return fail("reauth_required", 401);
    }

    userId = id;
  } catch {
    return fail("unauthorized", 401);
  }

  // Admin client from the platform-provided secret key (SUPABASE_SECRET_KEYS["default"]).
  let admin: AdminClient;
  try {
    admin = createAdminClient();
  } catch {
    // Missing env — do not log or return any detail about keys.
    return fail("internal_error", 500);
  }

  // 2a. Storage first. On any failure, stop WITHOUT deleting the user.
  try {
    const paths = await listUserFiles(admin, userId);
    if (paths.length > 0) await removeFiles(admin, paths);
  } catch {
    return fail("storage_cleanup_failed", 500);
  }

  // 2b. Delete the auth user.
  try {
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return fail("user_delete_failed", 500);
  } catch {
    return fail("user_delete_failed", 500);
  }

  // 2c. Verify database rows are gone; remove any leftovers explicitly.
  // The account is already deleted here, so this step never fails the request: the FK
  // cascade has removed the rows and the user cannot sign in again to retry.
  try {
    await ensureRowsGone(admin, userId);
  } catch {
    logOutcome("db_cleanup_warning");
    return json({ ok: true }, 200);
  }

  logOutcome("ok");
  return json({ ok: true }, 200);
}

export default {
  fetch: async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch {
      // Last-resort guard: never let an error escape unhandled.
      return fail("internal_error", 500);
    }
  },
};
