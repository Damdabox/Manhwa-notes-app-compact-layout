// Grab the elements we need from the page
const titleInput = document.getElementById('titleInput');
const typeInput = document.getElementById('typeInput');
const authorInput = document.getElementById('authorInput');
const chapterInput = document.getElementById('chapterInput');
const volumeInput = document.getElementById('volumeInput');
const pageInput = document.getElementById('pageInput');
const episodeInput = document.getElementById('episodeInput');
const linkInput = document.getElementById('linkInput');
const statusInput = document.getElementById('statusInput');
const tagInput = document.getElementById('tagInput');
const addTagButton = document.getElementById('addTagButton');
const tagsPreview = document.getElementById('tagsPreview');
const addButton = document.getElementById('addButton');
const bulkAddButton = document.getElementById('bulkAddButton');
const bulkAddPanel = document.getElementById('bulkAddPanel');
const bulkAddTextarea = document.getElementById('bulkAddTextarea');
const bulkAddStatusInput = document.getElementById('bulkAddStatusInput');
const bulkAddSubmitButton = document.getElementById('bulkAddSubmitButton');
const bulkAddCancelButton = document.getElementById('bulkAddCancelButton');
const quickNotesButton = document.getElementById('quickNotesButton');
const addEntrySheetOverlay = document.getElementById('addEntrySheetOverlay');
const openAddEntrySheetButton = document.getElementById('openAddEntrySheetButton');
const addEntrySheetCloseButton = document.getElementById('addEntrySheetCloseButton');
const quickNoteModalOverlay = document.getElementById('quickNoteModalOverlay');
const quickNoteModalTitleInput = document.getElementById('quickNoteModalTitleInput');
const quickNoteModalTextInput = document.getElementById('quickNoteModalTextInput');
const quickNoteModalSaveButton = document.getElementById('quickNoteModalSaveButton');
const quickNoteModalDeleteButton = document.getElementById('quickNoteModalDeleteButton');
const quickNoteModalCloseButton = document.getElementById('quickNoteModalCloseButton');
const manhwaList = document.getElementById('manhwaList');
const charactersList = document.getElementById('charactersList');
const filterTabs = document.querySelectorAll('.filter-tab');
const statusFilterRow = document.getElementById('statusFilterRow');
const statusAllButton = document.getElementById('statusAllButton');
const statusDropdown = document.getElementById('statusDropdown');
const statusDropdownButton = document.getElementById('statusDropdownButton');
const statusDropdownLabel = document.getElementById('statusDropdownLabel');
const statusDropdownMenu = document.getElementById('statusDropdownMenu');
const searchInput = document.getElementById('searchInput');
const clearSearchButton = document.getElementById('clearSearchButton');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValueLabel = document.getElementById('zoomValueLabel');
const zoomInButton = document.getElementById('zoomInButton');
const zoomOutButton = document.getElementById('zoomOutButton');
const privacyToggleInput = document.getElementById('privacyToggleInput');
const libraryView = document.getElementById('libraryView');
const detailView = document.getElementById('detailView');
const backButton = document.getElementById('backButton');
const detailTitle = document.getElementById('detailTitle');
const detailStatusBadge = document.getElementById('detailStatusBadge');
const detailChapter = document.getElementById('detailChapter');
const detailAuthor = document.getElementById('detailAuthor');
const detailLink = document.getElementById('detailLink');
const detailTags = document.getElementById('detailTags');
const detailRating = document.getElementById('detailRating');
const linkPopup = document.getElementById('linkPopup');
const linkPopupOpenButton = document.getElementById('linkPopupOpenButton');
const linkPopupCopyButton = document.getElementById('linkPopupCopyButton');

// --- Detail page "Edit" form (second edit entry point) ---
// detailViewFields wraps everything above (title through rating) plus
// the Edit button, so showDetailView() and the Save/Cancel handlers
// below can hide/show that whole group in one line, in exchange for
// showing/hiding detailEditForm instead. See the big comment in
// index.html right above #detailViewFields for the full picture.
const detailViewFields = document.getElementById('detailViewFields');
const editEntryButton = document.getElementById('editEntryButton');
const detailEditForm = document.getElementById('detailEditForm');
const editEntryTitle = document.getElementById('editEntryTitle');
const editEntryType = document.getElementById('editEntryType');
const editEntryAuthor = document.getElementById('editEntryAuthor');
const editEntryChapter = document.getElementById('editEntryChapter');
const editEntryVolume = document.getElementById('editEntryVolume');
const editEntryPage = document.getElementById('editEntryPage');
const editEntryEpisode = document.getElementById('editEntryEpisode');
const editEntryLink = document.getElementById('editEntryLink');
const editEntryStatus = document.getElementById('editEntryStatus');
const editEntryRating = document.getElementById('editEntryRating');
const editEntryTagsPreview = document.getElementById('editEntryTagsPreview');
const editEntryTagInput = document.getElementById('editEntryTagInput');
const editEntryTagAddButton = document.getElementById('editEntryTagAddButton');
const saveEntryEditButton = document.getElementById('saveEntryEditButton');
const cancelEntryEditButton = document.getElementById('cancelEntryEditButton');

const detailNotesTextarea = document.getElementById('detailNotesTextarea');
const saveNotesButton = document.getElementById('saveNotesButton');
const detailScenesList = document.getElementById('detailScenesList');
const addSceneButton = document.getElementById('addSceneButton');
const addSceneForm = document.getElementById('addSceneForm');
const sceneDescriptionInput = document.getElementById('sceneDescriptionInput');
const sceneLinkInput = document.getElementById('sceneLinkInput');
const saveSceneButton = document.getElementById('saveSceneButton');
const cancelSceneButton = document.getElementById('cancelSceneButton');
const detailCoverColumn = document.getElementById('detailCoverColumn');
const detailCoverBox = document.getElementById('detailCoverBox');
const coverImageInput = document.getElementById('coverImageInput');
const removeCoverImageButton = document.getElementById('removeCoverImageButton');
const detailCharactersList = document.getElementById('detailCharactersList');
const addCharacterButton = document.getElementById('addCharacterButton');
const addCharacterForm = document.getElementById('addCharacterForm');
const characterNameInput = document.getElementById('characterNameInput');
const characterImageInput = document.getElementById('characterImageInput');
const removeCharacterImageButton = document.getElementById('removeCharacterImageButton');
const characterFormPreviewBox = document.getElementById('characterFormPreviewBox');
const saveCharacterButton = document.getElementById('saveCharacterButton');
const cancelCharacterButton = document.getElementById('cancelCharacterButton');

// --- Icons ---
// These are small SVG (Scalable Vector Graphics) pictures, written out
// as plain text. A browser can draw an <svg> the same way it draws any
// other HTML element - no image file, icon library, or internet
// connection needed, which is why this still works fully offline.
//
// How to read one, using the link icon below as an example:
//   - <svg viewBox="0 0 24 24" ...> sets up a 24x24 unit drawing
//     "canvas" that the shapes inside are positioned on.
//   - width="14" height="14" is how big it actually shows up on the
//     page (much smaller than the 24x24 canvas - it just scales down).
//   - fill="none" stroke="currentColor" means: don't fill the shape
//     with color, just draw its outline, and use whatever text color
//     is already active on the page. That's what makes these icons
//     automatically match each button's color (including turning
//     white on hover), instead of us having to hardcode a color.
//   - <path d="..."> is the actual line being drawn. The "d" attribute
//     is a list of drawing instructions: M = "move to" a starting
//     point, L = "draw a line to", C/a = "draw a curve", Z = "close
//     the shape back to the start". Each letter is followed by x,y
//     coordinates on that 24x24 canvas.
// You don't need to memorize the path instructions - think of each
// icon as a tiny, fixed drawing that we just paste in wherever we
// need it, the same way you'd paste in a small image.
const ICON_LINK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5"></path><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5"></path></svg>';

const ICON_PENCIL = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>';

const ICON_TRASH = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>';

// --- Star rating ---
// All three star states (full, half, empty) are drawn from the exact
// same star-shaped outline below - only the *fill* changes between
// them. Think of STAR_PATH as a cookie cutter: we can stamp it out
// solid gold, hollow, or half-and-half, and it's always the same
// shape.
//
// The half star is the interesting one. We draw it by stacking TWO
// copies of that same star directly on top of each other:
//   1. A gray outline copy on the bottom - this is what makes the
//      right half look "empty" once the gold copy covers the left.
//   2. A solid gold copy on top, but "clipped" so only its left half
//      actually shows. Clipping works like a stencil: <clipPath>
//      defines a small rectangle covering just the left half of the
//      star's 24x24 drawing area, and clip-path="url(#...)" on the
//      gold star means "only draw the parts of this shape that fall
//      inside that rectangle" - the right half of the gold star is
//      there in the code, but invisible.
// Every clipPath on a page needs its own unique id (that's just how
// SVG ids work), and a card can have more than one half star drawn on
// it over time, so halfStarIdCounter counts up by one every time we
// draw one, giving each a name like "half-star-clip-0", "-1", "-2"...
const STAR_PATH = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
let halfStarIdCounter = 0;

// Builds one star <svg> as an HTML string, in the requested fill state.
function buildStarSVG(fillType) {
  if (fillType === 'full') {
    // Solid gold fill = a full star.
    return '<svg viewBox="0 0 24 24" width="16" height="16" class="star-svg">' +
      '<path d="' + STAR_PATH + '" fill="#ffd700" stroke="#c9a400" stroke-width="1"></path>' +
      '</svg>';
  }

  if (fillType === 'half') {
    const clipId = 'half-star-clip-' + halfStarIdCounter;
    halfStarIdCounter++;

    return '<svg viewBox="0 0 24 24" width="16" height="16" class="star-svg">' +
      '<path d="' + STAR_PATH + '" fill="none" stroke="#999" stroke-width="1"></path>' +
      '<clipPath id="' + clipId + '"><rect x="0" y="0" width="12" height="24"></rect></clipPath>' +
      '<path d="' + STAR_PATH + '" fill="#ffd700" stroke="#c9a400" stroke-width="1" clip-path="url(#' + clipId + ')"></path>' +
      '</svg>';
  }

  // 'empty': no fill at all, just the gray outline.
  return '<svg viewBox="0 0 24 24" width="16" height="16" class="star-svg">' +
    '<path d="' + STAR_PATH + '" fill="none" stroke="#999" stroke-width="1"></path>' +
    '</svg>';
}

// Builds the whole 5-star row as one HTML string for a given rating
// (0 to 5, in .5 steps). Star index 0 (the 1st star) is full once the
// rating reaches 1, star index 1 (the 2nd star) is full once the
// rating reaches 2, and so on - so for star "i", "i + 1" is its own
// full-star threshold and "i + 0.5" is its half-star threshold.
function buildStarsHTML(rating) {
  let starsHTML = '';

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      starsHTML += buildStarSVG('full');
    } else if (rating >= i + 0.5) {
      starsHTML += buildStarSVG('half');
    } else {
      starsHTML += buildStarSVG('empty');
    }
  }

  return starsHTML;
}

// --- Tags ---
// Tags are freeform words like "isekai" or "slow burn" that you attach
// to a comic. Unlike status (a fixed dropdown), there's no set list of
// tags - you can type anything, and each comic can have any number of
// them (including zero).
//
// The tricky part with "any number of them" is that we can't just use
// one text input like titleInput, because a single <input> can only
// hold one piece of text at a time. Instead, each comic's tags are
// kept as a plain JavaScript array of strings, e.g.
// ["isekai", "revenge"], and we build one small on-screen "chip" per
// tag in that array, each with its own little (x) remove button. Both
// of the functions below work on whatever array you hand them, which
// is what lets the exact same code run the tag picker in the
// Add-comic form AND the tag picker inside a card's edit mode - see
// newComicTags and editingTags for where those two arrays live.

// Redraws the tag chips for one tagsArray inside one container
// element. Called both right after a tag is added (so the new chip
// shows up) and right after one is removed (so the removed chip goes
// away) - it's simplest to just wipe the container and rebuild it
// from the current array every time, rather than trying to patch in
// one chip at a time.
function renderTagChips(container, tagsArray) {
  container.innerHTML = '';

  tagsArray.forEach(function (tag, index) {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.textContent = tag;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'tag-remove-button';
    removeButton.textContent = '×'; // the "x" (multiplication sign) symbol
    removeButton.setAttribute('aria-label', 'Remove tag ' + tag);
    removeButton.addEventListener('click', function () {
      // .splice(index, 1) removes exactly one item at this chip's
      // position in the array and shifts everything after it down -
      // e.g. removing index 1 from ["a", "b", "c"] leaves ["a", "c"].
      // Because tagsArray is the *same* array object the caller is
      // holding onto (not a copy), this change is visible to them
      // immediately too, with no extra step to "save it back".
      tagsArray.splice(index, 1);

      // Redraw just this chip row so the removed chip disappears.
      renderTagChips(container, tagsArray);
    });

    chip.appendChild(removeButton);
    container.appendChild(chip);
  });
}

// Like renderTagChips() above, but for the read-only detail page: each
// tag becomes a plain chip with no (x) remove button, since there's
// nothing to edit there yet. Shows a small placeholder message instead
// of an empty row when the comic has no tags at all.
function buildReadOnlyTagChips(container, tagsArray) {
  container.innerHTML = '';

  if (tagsArray.length === 0) {
    container.textContent = 'No tags added';
    return;
  }

  tagsArray.forEach(function (tag) {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.textContent = tag;
    container.appendChild(chip);
  });
}

// --- Favorite Scenes ---
// A "scene" is a specific moment in a comic you want to be able to
// jump back to later - a short description of what happens, plus a
// link straight to that chapter/page. Like tags, each comic can have
// any number of scenes (including zero), so they're kept as a plain
// JavaScript array on the entry, e.g. entry.scenes. The difference
// from tags is that ONE tag is just a single word/string, but ONE
// scene needs to remember TWO things at once (its description and its
// link) - so instead of an array of strings, entry.scenes is an array
// of small objects, each shaped like:
//   { description: "Sung Jin-Woo awakens as a monarch", link: "https://..." }
// Everything else works the same way as tags: we redraw the whole list
// from the array any time something's added or removed, rather than
// trying to patch in one row at a time.

// Redraws every saved scene for the comic currently open on the
// detail page, into #detailScenesList. Each scene becomes one row
// with its description, its link (a real clickable link if one was
// saved, or a plain "No link added" message otherwise - same idea as
// detailLink in showDetailView() below), and a small (x) button that
// deletes just that one scene. A comic with an empty scenes array
// just leaves the list empty - no placeholder text, since empty here
// is a completely normal, expected state (most comics won't have any
// favorite scenes saved).
function renderSceneEntries(entry) {
  detailScenesList.innerHTML = '';

  entry.scenes.forEach(function (scene, index) {
    const row = document.createElement('div');
    row.className = 'scene-entry';

    const info = document.createElement('div');
    info.className = 'scene-entry-info';

    const description = document.createElement('p');
    description.className = 'scene-description';
    description.textContent = scene.description;
    info.appendChild(description);

    const link = document.createElement('a');
    link.className = 'scene-link';
    if (scene.link) {
      link.href = scene.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open Scene';
    } else {
      link.textContent = 'No link added';
      link.classList.add('scene-link-empty');
    }
    info.appendChild(link);

    row.appendChild(info);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'scene-delete-button';
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', 'Delete this scene');
    deleteButton.addEventListener('click', function () {
      // Same .splice() trick renderTagChips() uses to remove one tag -
      // this removes just this one scene (by its position in the
      // array) and shifts the rest down, then saves the shorter list
      // and redraws so the deleted row disappears.
      entry.scenes.splice(index, 1);
      saveToStorage();
      renderSceneEntries(entry);
    });
    row.appendChild(deleteButton);

    detailScenesList.appendChild(row);
  });
}

// --- Favorite Characters ---
// A "character" is just a name plus an optional small picture, saved
// against ONE comic - characters can only be added/edited/deleted from
// that comic's own detail page. Same array-on-the-entry idea as tags
// and scenes above (entry.characters), so a comic with none yet is
// simply an empty array, not an error. Each character is a small object
// shaped like:
//   { id: "character-...", name: "Sung Jin-Woo", hasImage: true }
// "id" works exactly like a comic's own "id" field (see
// generateComicId() and the big "Cover images" comment further up this
// file): it's what a character's picture (if any) is saved under in
// IndexedDB, so it has to stay the same for as long as the character
// exists. "hasImage" is the same fast yes/no flag a comic's own
// hasImage is - it lives here in the small amount of data saved to
// localStorage, so rendering a character never has to ask IndexedDB
// "does this one have a picture?" before deciding whether to bother
// loading one.

// Redraws every saved character for the comic currently open on the
// detail page, into #detailCharactersList. Each character becomes one
// small row: its picture (or the plain placeholder box, if it has
// none), its name, and small Edit/Delete buttons.
function renderCharacterEntries(entry) {
  detailCharactersList.innerHTML = '';

  entry.characters.forEach(function (character) {
    const row = document.createElement('div');
    row.className = 'character-entry';

    // Same placeholder-box idea as a comic's own cover (see
    // .cover-placeholder in style.css) - just drawn much smaller here
    // via the extra "character-avatar" class. Left showing "No Photo"
    // unless this character actually has a saved picture.
    const avatarBox = document.createElement('div');
    avatarBox.className = 'cover-placeholder character-avatar';
    const avatarPlaceholderText = document.createElement('span');
    avatarPlaceholderText.className = 'cover-placeholder-text';
    avatarPlaceholderText.textContent = 'No Photo';
    avatarBox.appendChild(avatarPlaceholderText);
    row.appendChild(avatarBox);

    if (character.hasImage) {
      applyCharacterImageToElement(avatarBox, character.id);
    }

    const nameElement = document.createElement('div');
    nameElement.className = 'character-name';
    nameElement.textContent = character.name;
    row.appendChild(nameElement);

    const actionsRow = document.createElement('div');
    actionsRow.className = 'character-actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'character-edit-button';
    editButton.innerHTML = ICON_PENCIL;
    editButton.title = 'Edit';
    editButton.setAttribute('aria-label', 'Edit character ' + character.name);
    editButton.addEventListener('click', function () {
      startEditCharacter(character);
    });
    actionsRow.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'character-delete-button';
    deleteButton.innerHTML = ICON_TRASH;
    deleteButton.title = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete character ' + character.name);
    deleteButton.addEventListener('click', function () {
      deleteCharacter(entry, character);
    });
    actionsRow.appendChild(deleteButton);

    row.appendChild(actionsRow);

    detailCharactersList.appendChild(row);
  });
}

// --- Characters tab (combined list, across every comic) ---
// The "Characters" folder tab (see filterTabs' click handler and
// renderList() further down this file) doesn't filter the shelf by
// status like every other tab - it replaces the shelf entirely with
// one combined list of EVERY character saved on EVERY comic's own
// detail page, no matter which comic they belong to.
//
// "Combining them into one list" just means: loop over every comic in
// manhwaEntries, and for each one, loop over that comic's own
// entry.characters array (the same array renderCharacterEntries()
// above draws one comic's Favorite Characters from), copying each
// character out into one single flat array. The only extra thing we
// keep track of along the way is which comic each character came from
// (see "comicEntry" below) - we need that both to show the comic's
// title next to the character, and to know which comic to open if
// this character is clicked.
function buildCombinedCharacterList() {
  const combinedList = [];

  manhwaEntries.forEach(function (comicEntry) {
    // "comicEntry.characters || []" covers a comic that's never had
    // its own detail page opened yet, so it has no "characters" field
    // at all - same fallback used in showDetailView() further down
    // this file.
    (comicEntry.characters || []).forEach(function (character) {
      combinedList.push({
        character: character,
        comicEntry: comicEntry
      });
    });
  });

  // Sort alphabetically by character name. When two or more characters
  // share the exact same name, .sort() would otherwise just leave them
  // in whatever order they happened to be found in above - so as a
  // tie-breaker, sort those matching names alphabetically by their
  // comic's title instead, so the order is always predictable.
  combinedList.sort(function (a, b) {
    const nameA = a.character.name.toLowerCase();
    const nameB = b.character.name.toLowerCase();

    if (nameA < nameB) {
      return -1; // a's name comes first
    }
    if (nameA > nameB) {
      return 1; // b's name comes first
    }

    // Names are identical - break the tie using the comic title.
    const titleA = a.comicEntry.title.toLowerCase();
    const titleB = b.comicEntry.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  return combinedList;
}

// Rebuilds #charactersList from every comic's saved characters. Called
// by renderList() (see further down this file) whenever the
// Characters tab is the active one.
function renderCharactersList() {
  charactersList.innerHTML = '';

  const combinedList = buildCombinedCharacterList();

  combinedList.forEach(function (item) {
    const character = item.character;
    const comicEntry = item.comicEntry;

    // Same card shape as a comic card on the shelf (#manhwaList li in
    // renderList() below) - a picture box on top, then text
    // underneath - just built fresh here with the character's own
    // picture/name, plus the title of the comic they belong to, and
    // no Edit/Delete buttons, since characters can still only be
    // added/edited/deleted from their own comic's detail page, not
    // from here. See ".character-card" in style.css for the sizing
    // that makes this match the Manhwa/Other Comics cards instead of
    // looking like a small plain list row.
    const card = document.createElement('li');
    card.className = 'character-card detail-link-target';

    // Reuses the plain ".cover-placeholder" box every comic cover
    // uses (not the small ".character-avatar" variant shown on a
    // comic's own Favorite Characters list) so this picture is the
    // same size/shape as a comic cover, matching the "comic-card-
    // style tile" look asked for.
    const avatarBox = document.createElement('div');
    avatarBox.className = 'cover-placeholder';
    const avatarPlaceholderText = document.createElement('span');
    avatarPlaceholderText.className = 'cover-placeholder-text';
    avatarPlaceholderText.textContent = 'No Photo';
    avatarBox.appendChild(avatarPlaceholderText);
    if (character.hasImage) {
      applyCharacterImageToElement(avatarBox, character.id);
    }
    card.appendChild(avatarBox);

    const nameElement = document.createElement('div');
    nameElement.className = 'entry-title';
    nameElement.textContent = character.name;
    card.appendChild(nameElement);

    // The source comic's title, shown under the character's name -
    // see ".character-list-comic-title" in style.css. This is what
    // makes two characters with the same name (from two different
    // comics) easy to tell apart at a glance.
    const comicTitleElement = document.createElement('div');
    comicTitleElement.className = 'character-list-comic-title';
    comicTitleElement.textContent = comicEntry.title;
    card.appendChild(comicTitleElement);

    // Clicking anywhere on the card opens the DETAIL PAGE OF THE COMIC
    // THIS CHARACTER BELONGS TO (comicEntry) - not some "character
    // page", since characters don't have their own page anywhere in
    // this app. One listener on the whole card (rather than separate
    // ones on the picture and the text, like a comic card needs) is
    // enough here since a character card has nothing else clickable
    // on it.
    card.addEventListener('click', function () {
      showDetailView(comicEntry);
    });

    charactersList.appendChild(card);
  });
}

// Reads whatever's currently typed into inputElement, and - if it's
// not empty and not already in tagsArray - adds it as a new tag and
// redraws the chips. Shared by both the Add-comic form's "Add Tag"
// button/Enter key and the same pair inside edit mode.
function addTagFromInput(inputElement, tagsArray, container) {
  const newTag = inputElement.value.trim();

  if (newTag === '') {
    return;
  }

  // .some() checks each existing tag and stops as soon as one matches,
  // returning true/false. Comparing with .toLowerCase() on both sides
  // means "Isekai" counts as a duplicate of an existing "isekai" tag,
  // instead of letting near-identical tags pile up.
  const isDuplicate = tagsArray.some(function (existingTag) {
    return existingTag.toLowerCase() === newTag.toLowerCase();
  });

  if (!isDuplicate) {
    tagsArray.push(newTag);
    renderTagChips(container, tagsArray);
  }

  // Clear the box either way, so it's ready for the next tag to be
  // typed (also covers the duplicate case - no reason to leave a
  // rejected duplicate sitting in the box).
  inputElement.value = '';
  inputElement.focus();
}

// This array is our "data" - it holds one object per manhwa entry.
// Keeping the data separate from the page display makes it easy to
// redraw the whole list whenever something changes.
const manhwaEntries = [];

// The tags being built up for a new comic in the Add-comic form,
// before "Add Entry" is clicked. Starts empty, grows/shrinks as tags
// are added/removed via tagInput + addTagButton, and gets copied onto
// the new entry (then reset back to empty) when the comic is added -
// see the addButton click handler below.
const newComicTags = [];

// Which tab is currently selected. Starts on "All" to match the
// "active" class already on that button in the HTML. Holds either
// "All", one of the three entry.type values ("Manhwa", "Other Comics",
// "Videos" - see the matchesFolder check inside renderList() below),
// or "Characters" (a special case handled separately, not a real
// filter at all - see the top of renderList()).
let currentFilter = 'All';

// Whatever's currently typed into the search box, already lowercased
// and trimmed (see the "input" listener near the bottom of this file
// for where it gets set). Starts empty, which means "no search typed
// yet - don't filter anything out based on search". Keeping it
// lowercased here, once, means renderList() below never has to
// remember to lowercase it itself every time it checks a comic.
let currentSearchTerm = '';

// Which display mode the shelf is in. 'cover' is the normal look:
// every comic is a card with its cover placeholder, status ribbon,
// stars, etc. 'private' swaps EVERY comic for a plain text row
// instead - no image, no ribbon, just title + compact info + the
// edit/delete icons. This is purely about how renderList() draws
// the shelf; it never changes what's stored in manhwaEntries, and it
// never hides individual comics - see the "Privacy toggle" section
// near the bottom of this file for what flips it.
let displayMode = 'cover';

// The four statuses a comic can have. Both the "Add" dropdown (in the
// HTML) and the "Edit" dropdown (built below in JS) offer these same
// choices, so they're listed once here instead of typed out twice.
const STATUS_OPTIONS = ['Reading', 'Ongoing', 'Completed', 'Recommended'];

// --- Type ---
// The three kinds of entry this app can track. Both the "Add" dropdown
// (#typeInput in the HTML) and the "Edit" dropdown (built below in JS,
// same idea as STATUS_OPTIONS just above) offer these same choices.
//
// What makes "type" special compared to status/tags/etc. is that it
// decides which *progress field(s)* apply to an entry:
//   Manhwa        -> Chapter #
//   Other Comics  -> Volume # and Page #
//   Videos        -> Episode # (optional)
// Every entry object still has ALL FOUR fields (chapter, volume, page,
// episode) no matter its type - only the one(s) that match its type
// ever get filled in by the user, the rest just stay ''. Giving every
// entry the exact same shape like this (rather than only adding the
// fields that apply) means the rest of the code never has to check
// "does this entry even have a volume field?" before reading it - see
// loadFromStorage() further down for how older saved comics (from
// before "type" existed at all) get backfilled to match this shape.
const ENTRY_TYPES = ['Manhwa', 'Other Comics', 'Videos'];

// --- Status filter (nested inside each type tab) ---
// Each type tab (Manhwa / Other Comics / Videos) gets its OWN status
// filter - the "All" toggle and status dropdown described in
// #statusFilterRow in index.html. The key thing the app needs to
// remember is that these three tabs must NOT share one filter: setting
// Manhwa to "Reading" and then clicking over to Other Comics should
// show whatever Other Comics had last, not "Reading".
//
// The way we do that is simple: instead of one plain variable (which
// could only remember ONE filter at a time, for whichever tab you're
// on right now), we use one object with a separate small "filter
// state" for every type, keyed by that type's own name:
//   typeStatusFilters['Manhwa']       -> Manhwa's own filter
//   typeStatusFilters['Other Comics'] -> Other Comics' own filter
//   typeStatusFilters['Videos']       -> Videos' own filter
// Switching tabs never touches the other two types' entries in this
// object, so each one just sits there holding its last value until you
// switch back to it - which is exactly what "remembers its own
// selection" means here.
//
// Each type's own filter state is itself a small object with two
// pieces:
//   mode:   'All' (show every status for this type) or 'Status' (only
//           show entries matching the status below). This is what
//           decides which of #statusAllButton / #statusDropdownButton
//           looks "active", and whether renderList() below applies a
//           status check at all.
//   status: whichever status the dropdown is currently showing as its
//           label (e.g. "Reading"). This is kept separate from "mode"
//           on purpose: clicking "All" switches mode to 'All' (so
//           everything shows) WITHOUT forgetting which status the
//           dropdown had last - so if you click "All" and then open
//           the dropdown again, it still remembers "Reading" instead
//           of resetting to the first option every time.
// Every type starts on mode: 'All', matching how the shelf looked
// before this feature existed - nothing is filtered out by status
// until you actually pick one.
const typeStatusFilters = {};
ENTRY_TYPES.forEach(function (type) {
  typeStatusFilters[type] = { mode: 'All', status: STATUS_OPTIONS[0] };
});

// Closes the status dropdown menu (if it's open). Shared by every place
// that needs the menu to close: picking an option, clicking "All",
// clicking anywhere else on the page, and switching tabs.
function closeStatusDropdown() {
  statusDropdownMenu.style.display = 'none';
  statusDropdownButton.setAttribute('aria-expanded', 'false');
}

// Builds the list of status choices inside #statusDropdownMenu, one
// button per entry in STATUS_OPTIONS. Only ever needs to run once (the
// list of possible statuses never changes while the app is running),
// unlike updateStatusFilterRowUI() below, which re-runs constantly.
function buildStatusDropdownMenu() {
  STATUS_OPTIONS.forEach(function (status) {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'status-dropdown-option';
    optionButton.textContent = status;
    optionButton.addEventListener('click', function () {
      // currentFilter (set by the type-tab click handler further down
      // this file) tells us which type's filter state to update - so
      // picking "Completed" while the Videos tab is active only ever
      // touches typeStatusFilters['Videos'], never Manhwa's or Other
      // Comics' own filter.
      const filterState = typeStatusFilters[currentFilter];
      filterState.status = status;
      filterState.mode = 'Status';

      closeStatusDropdown();
      updateStatusFilterRowUI();
      renderList();
    });
    statusDropdownMenu.appendChild(optionButton);
  });
}

// Redraws #statusFilterRow so it matches whichever type tab is active
// right now: shows/hides the whole row, and (when shown) updates the
// "All" button + dropdown label/highlight to reflect THAT type's own
// remembered filter state from typeStatusFilters above. Called every
// time the active tab changes, and right after the status filter
// itself changes (picking a status, or clicking "All").
function updateStatusFilterRowUI() {
  const isTypeTab = ENTRY_TYPES.includes(currentFilter);

  // The "All" top-level tab and the "Characters" tab don't get a
  // status dropdown at all - see the big comment above the tabs-row
  // div in index.html for why. Hiding the whole row for both of those
  // is simplest: there's nothing useful for it to show either way.
  statusFilterRow.style.display = isTypeTab ? '' : 'none';

  if (!isTypeTab) {
    return;
  }

  const filterState = typeStatusFilters[currentFilter];

  statusAllButton.classList.toggle('active', filterState.mode === 'All');
  statusDropdownButton.classList.toggle('active', filterState.mode === 'Status');
  statusDropdownLabel.textContent = filterState.status;
}

// Figures out which progress field(s) should be visible for a given
// type, and shows/hides the real inputs to match. Used by the Add-entry
// form (whenever #typeInput changes) and can be reused for any other
// group of the same four fields, as long as you pass in that group's
// own field elements instead of the Add-form's.
function updateProgressFieldsVisibility(type, fields) {
  fields.chapterField.style.display = (type === 'Manhwa') ? '' : 'none';
  fields.volumeField.style.display = (type === 'Other Comics') ? '' : 'none';
  fields.pageField.style.display = (type === 'Other Comics') ? '' : 'none';
  fields.episodeField.style.display = (type === 'Videos') ? '' : 'none';
}

// Shows/hides one Author field based on the given type - Author only
// applies to Manhwa and Other Comics, not Videos. Same reusable idea
// as updateProgressFieldsVisibility() just above, just for a single
// field instead of a group of four, so it's used the same way by both
// the Add-entry form and the edit-mode form.
function updateAuthorFieldVisibility(type, field) {
  field.style.display = (type === 'Manhwa' || type === 'Other Comics') ? '' : 'none';
}

// Builds the short progress label shown on a card, a private-mode row,
// and the detail page - e.g. "Ch. 12", "Vol. 3, Pg. 45", "Ep. 6". Only
// includes the piece(s) that actually have something typed in, and
// returns '' (nothing shown at all) if the relevant field(s) are blank -
// this is what makes Episode # "blank-friendly" for a Videos entry with
// no episode number (a single movie, for example), and also means an
// old Manhwa entry with no chapter typed in just shows nothing instead
// of a bare "Ch. ".
function formatProgressText(entry) {
  if (entry.type === 'Other Comics') {
    const parts = [];
    if (entry.volume) {
      parts.push('Vol. ' + entry.volume);
    }
    if (entry.page) {
      parts.push('Pg. ' + entry.page);
    }
    return parts.join(', ');
  }

  if (entry.type === 'Videos') {
    return entry.episode ? ('Ep. ' + entry.episode) : '';
  }

  // Manhwa (and, as a safe fallback, anything else) uses Chapter #.
  return entry.chapter ? ('Ch. ' + entry.chapter) : '';
}

// Which entry (if any) is currently shown as editable inputs instead
// of plain text. null means no card is being edited right now.
// We store the actual entry object (not a copy, not an index) so we
// can compare it against each entry in the loop below with "===".
let entryBeingEdited = null;

// The name/key we save our data under in localStorage. Using one
// constant instead of retyping the string means saveToStorage() and
// loadFromStorage() can never accidentally use different keys.
const STORAGE_KEY = 'manhwaEntries';

// localStorage can only store text (strings) - it can't store a real
// JavaScript array of objects. JSON.stringify() converts our
// manhwaEntries array into one long text string that looks like
// '[{"title":"Solo Leveling","chapter":"180",...}]' so it's safe to
// hand to localStorage. We call this any time the data changes so
// what's saved always matches what's on screen.
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(manhwaEntries));
}

// The reverse of saveToStorage(): reads that saved text string back
// out of localStorage and uses JSON.parse() to turn it back into a
// real JavaScript array of objects again, so it can be used like any
// other array (looped over, filtered, etc). If nothing has been
// saved yet, localStorage.getItem() returns null and we just leave
// manhwaEntries empty.
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const savedEntries = JSON.parse(saved);

    // manhwaEntries is a const, so we can't replace it with a new
    // array - but we can push the saved entries into the existing
    // one. The ...savedEntries "spread" pushes each entry in one at
    // a time, same as if we'd typed them out individually.
    manhwaEntries.push(...savedEntries);

    // Comics saved before the cover-image feature existed have no
    // "id" or "hasImage" field yet (those didn't exist when they were
    // written to localStorage). Give every entry that's missing one a
    // fresh id and hasImage: false, so the code below can always rely
    // on both fields being there no matter how old the saved data is.
    let backfilledSomething = false;
    manhwaEntries.forEach(function (entry) {
      if (!entry.id) {
        entry.id = generateComicId();
        backfilledSomething = true;
      }
      if (entry.hasImage === undefined) {
        entry.hasImage = false;
        backfilledSomething = true;
      }

      // Comics saved before the Type feature existed have no "type"
      // field yet either - give every one of THOSE type: 'Manhwa'.
      // This is the key piece of the migration: it's exactly what the
      // task means by "existing comics should automatically be treated
      // as type Manhwa" - an old entry already has its chapter number
      // sitting in entry.chapter untouched, so once it's labeled
      // 'Manhwa' here, formatProgressText() above reads that same
      // entry.chapter field and displays "Ch. <whatever it already
      // was>" exactly as before. Nothing about the comic's existing
      // data is moved, renamed, or rewritten - it just gains one new
      // label.
      if (entry.type === undefined) {
        entry.type = 'Manhwa';
        backfilledSomething = true;
      }

      // Likewise, an entry from before Other Comics/Videos existed has
      // no volume/page/episode fields at all yet. Give it empty ones so
      // every entry - old or new - has the same four progress fields,
      // which is what the rest of this file assumes (see the "Type"
      // section further up).
      if (entry.volume === undefined) {
        entry.volume = '';
        backfilledSomething = true;
      }
      if (entry.page === undefined) {
        entry.page = '';
        backfilledSomething = true;
      }
      if (entry.episode === undefined) {
        entry.episode = '';
        backfilledSomething = true;
      }
    });

    // Write the backfilled ids/hasImage back to localStorage right
    // away (instead of waiting for some other change to trigger a
    // save). This matters specifically for "id": once a comic gets an
    // id, that id needs to stay the SAME forever, because it's also
    // used as the lookup key for that comic's cover image in
    // IndexedDB (see the "Cover images" section below). If we let a
    // fresh random id get generated again on every page load instead
    // of saving it, any image saved under yesterday's id would become
    // unreachable under today's new one.
    if (backfilledSomething) {
      saveToStorage();
    }
  }
}

// --- Cover images (IndexedDB) ---
//
// What is IndexedDB, in plain terms?
// -----------------------------------
// localStorage (used above for the comic list itself) is great for
// small bits of text, but it has a strict size limit (usually around
// 5MB total, for EVERYTHING it stores combined) and can only hold
// strings. A single decent-quality photo from a phone can easily be
// several MB all on its own - trying to stuff cover images into
// localStorage alongside manhwaEntries would blow through that limit
// almost immediately and could break the whole app.
//
// IndexedDB is a second, separate storage system built into the
// browser specifically for bigger and more complex data like this. Two
// differences from localStorage matter for us here:
//   1. Much higher storage limits (typically hundreds of MB or more,
//      depending on the browser/device) - plenty of room for photos.
//   2. It can store real binary data (a Blob - "Binary Large OBject",
//      basically "a file's raw bytes") directly, instead of forcing
//      everything into text first.
// The tradeoff is that IndexedDB's API is lower-level and more
// old-fashioned than localStorage's simple setItem()/getItem() - every
// read or write is done through a "transaction" and reports back via
// events (onsuccess/onerror) rather than just returning a value
// immediately. The three helper functions below (saveImageForComic,
// loadImageForComic, deleteImageForComic) wrap that up so the rest of
// this file can just call them and use the friendlier .then()/.catch()
// style instead, the same way fetch() or setTimeout-based code often
// does.
//
// How we connect an image back to the right comic:
// --------------------------------------------------
// IndexedDB stores each image under a "key", similar to how a plain
// JavaScript object looks things up by property name. We use each
// comic's own unique "id" field as that key (see generateComicId()
// below) - so "which comic does this image belong to" is answered by
// "whatever id it was saved under". The comic's own hasImage field
// (stored normally, in localStorage, right alongside its title/
// chapter/etc.) is just a fast yes/no flag - it tells the rendering
// code "bother checking IndexedDB for this one" without having to ask
// IndexedDB about EVERY comic on the shelf, most of which will never
// have a custom image at all.

// Makes a unique id for a newly-added comic, e.g.
// "comic-1798000000000-f3ap9k2". Date.now() (milliseconds since a
// fixed point in time) makes it extremely unlikely two comics get the
// same number even if added seconds apart, and the random suffix
// (Math.random() converted to a base-36 string, then trimmed to a few
// characters) protects against the rare case of two comics being
// added in the exact same millisecond.
function generateComicId() {
  return 'comic-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

// Same idea as generateComicId() above, just with a different prefix -
// used to give each Favorite Character their own unique id (see the
// "Favorite Characters" section further down this file). Character ids
// are their own separate id space from comic ids (a "character-..." id
// will never collide with a "comic-..." one), which matters because
// each character's picture is stored in IndexedDB keyed by this id -
// see saveImageForCharacter() etc. below.
function generateCharacterId() {
  return 'character-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

// How wide (in pixels) a stored cover image is allowed to be. Photos
// straight off a phone are often 3000-4000px wide - far more detail
// than a ~280px-wide cover box on screen could ever show. resizeImageFile()
// below shrinks anything wider than this BEFORE it's saved, so storage
// stays small and the app stays fast no matter how large the original
// photo was.
const MAX_COVER_IMAGE_WIDTH = 500;

// Same idea as MAX_COVER_IMAGE_WIDTH above, just smaller - a character
// picture only ever needs to fill the small ~48px-wide avatar box it's
// shown in (see .character-avatar in style.css), nowhere near as big as
// a full cover image, so there's no reason to store it any bigger than
// this.
const MAX_CHARACTER_IMAGE_WIDTH = 200;

// Takes the raw File object straight out of a <input type="file">
// (see the coverImageInput "change" listener further down) and
// resolves to a smaller, compressed Blob ready to be stored. Simple
// explanation of how the resizing actually works:
//   1. Load the picked file into a normal <img> element in memory
//      (never shown on the page - it's just a temporary holder so the
//      browser can decode the photo and tell us its real width/height).
//   2. Work out a smaller target width/height that preserves the same
//      proportions (so the photo doesn't look stretched or squashed) -
//      if the photo's already narrower than MAX_COVER_IMAGE_WIDTH, it's
//      left at its original size instead of being scaled UP.
//   3. Draw that image onto an in-memory <canvas> at the smaller
//      size. A canvas is a drawing surface - drawing a big image onto
//      a small canvas is exactly how the resizing happens; the canvas
//      only ever holds the smaller version.
//   4. Export the canvas back out as a compressed JPEG Blob
//      (canvas.toBlob), which is the small file we actually store.
// Every step here is asynchronous (loading a file, decoding an image,
// and encoding a new one all take a moment), so this returns a Promise
// that resolves once the final Blob is ready.
function resizeImageFile(file, maxWidth) {
  return new Promise(function (resolve, reject) {
    // FileReader reads the raw file the user picked off their device
    // and hands it back to us as a "data URL" (the file's bytes,
    // encoded as text) - the format an <img> element's "src" can load
    // directly, without ever uploading the file anywhere.
    const reader = new FileReader();

    reader.onload = function () {
      const image = new Image();

      image.onload = function () {
        // Start from the photo's real size, then shrink both
        // dimensions by the same ratio if it's wider than allowed -
        // that's what keeps it looking correctly proportioned instead
        // of squashed.
        let targetWidth = image.width;
        let targetHeight = image.height;

        if (targetWidth > maxWidth) {
          const scaleRatio = maxWidth / targetWidth;
          targetWidth = maxWidth;
          targetHeight = Math.round(image.height * scaleRatio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // getContext('2d') gives us a drawing tool for this canvas.
        // drawImage() below does the actual resizing: it draws the
        // full original photo, scaled to fit the smaller
        // targetWidth/targetHeight we just calculated.
        const canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(image, 0, 0, targetWidth, targetHeight);

        // Turn the canvas's pixels into a compressed JPEG file
        // (a Blob) - the same kind of compression a camera app uses,
        // trading a small amount of image quality for a much smaller
        // file size. 0.8 (80%) is a good middle ground: noticeably
        // smaller than 100% quality, with no visible quality loss for
        // a small cover thumbnail like this.
        canvas.toBlob(
          function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Could not process that image.'));
            }
          },
          'image/jpeg',
          0.8
        );
      };

      image.onerror = function () {
        reject(new Error('That file could not be read as an image.'));
      };

      image.src = reader.result;
    };

    reader.onerror = function () {
      reject(new Error('That file could not be read.'));
    };

    reader.readAsDataURL(file);
  });
}

// The name and version of our IndexedDB database, and the single
// "object store" (IndexedDB's word for something like a table) inside
// it where cover image Blobs are kept. A browser can have several
// separate IndexedDB databases; ours only needs the one.
const IMAGE_DB_NAME = 'manhwaNotesImagesDB';
// Bumped from 1 to 2 so that opening the database again (on anyone's
// existing saved data) triggers onupgradeneeded one more time - that's
// the one moment IndexedDB allows creating a new object store, which is
// how CHARACTER_STORE_NAME below gets added for everyone, without
// touching anything already saved in IMAGE_STORE_NAME.
const IMAGE_DB_VERSION = 2;
const IMAGE_STORE_NAME = 'coverImages';

// A second, separate "table" inside this exact same database, used to
// store Favorite Character pictures - see the big "How we connect an
// image back to the right comic" comment above, and the "Favorite
// Characters" section further down this file. This is what "characters
// use the same system as comic covers" actually means in practice: the
// same database, the same Blob-in-IndexedDB approach, and (below) the
// same three save/load/delete helper functions generalized to work on
// either store - just its own store, keyed by each character's own id
// instead of a comic's id, so a character's picture can never
// accidentally overwrite (or get confused with) a comic's cover image.
const CHARACTER_IMAGE_STORE_NAME = 'characterImages';

// Opening an IndexedDB database is itself an asynchronous, event-based
// operation (same reasoning as FileReader above). This function wraps
// that in a Promise, and caches the result in imageDatabasePromise so
// we only ever actually open the database once - every later call just
// reuses that same already-open connection.
let imageDatabasePromise = null;
function openImageDatabase() {
  if (imageDatabasePromise) {
    return imageDatabasePromise;
  }

  imageDatabasePromise = new Promise(function (resolve, reject) {
    const openRequest = indexedDB.open(IMAGE_DB_NAME, IMAGE_DB_VERSION);

    // Fires the very first time this database is opened on this
    // device (or when IMAGE_DB_VERSION is bumped up later) - this is
    // the one place IndexedDB allows creating/changing object stores.
    openRequest.onupgradeneeded = function () {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        db.createObjectStore(IMAGE_STORE_NAME);
      }
      // Added when IMAGE_DB_VERSION moved from 1 to 2 - guarded the same
      // way as IMAGE_STORE_NAME just above, so this also runs correctly
      // for a brand new database that's never existed before (which
      // jumps straight to version 2 and needs both stores created here
      // in one go, not just this one).
      if (!db.objectStoreNames.contains(CHARACTER_IMAGE_STORE_NAME)) {
        db.createObjectStore(CHARACTER_IMAGE_STORE_NAME);
      }
    };

    openRequest.onsuccess = function () {
      resolve(openRequest.result);
    };

    openRequest.onerror = function () {
      reject(openRequest.error);
    };
  });

  return imageDatabasePromise;
}

// Saves (or overwrites) an image Blob under one key, inside whichever
// object store is named. Using .put() (rather than .add()) means
// calling this a second time for a key that already has an image just
// replaces the old one - which is exactly what we want when a new photo
// is picked for a comic (or character) that already had one.
//
// This is written generically (storeName is a parameter, not always
// IMAGE_STORE_NAME) so that both the comic-cover helpers AND the
// character-picture helpers just below can share this one function
// instead of two near-identical copies of it - only *which store* they
// read/write differs between the two.
function saveImageToStore(storeName, key, imageBlob) {
  return openImageDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const transaction = db.transaction(storeName, 'readwrite');
      transaction.objectStore(storeName).put(imageBlob, key);
      transaction.oncomplete = function () { resolve(); };
      transaction.onerror = function () { reject(transaction.error); };
    });
  });
}

// Reads back the image Blob saved under one key in the named store, or
// resolves to undefined if that key has never had one saved.
function loadImageFromStore(storeName, key) {
  return openImageDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const transaction = db.transaction(storeName, 'readonly');
      const getRequest = transaction.objectStore(storeName).get(key);
      getRequest.onsuccess = function () { resolve(getRequest.result); };
      getRequest.onerror = function () { reject(getRequest.error); };
    });
  });
}

// Deletes whatever image is saved under one key in the named store.
// Deleting a key that was never saved is harmless - IndexedDB just
// does nothing, no error.
function deleteImageFromStore(storeName, key) {
  return openImageDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const transaction = db.transaction(storeName, 'readwrite');
      transaction.objectStore(storeName).delete(key);
      transaction.oncomplete = function () { resolve(); };
      transaction.onerror = function () { reject(transaction.error); };
    });
  });
}

// The three comic-cover-image functions the rest of this file already
// calls (coverImageInput's "change" handler, removeCoverImageButton,
// the delete-comic button, etc). Kept under their original names so
// none of that existing code has to change - each one just forwards to
// the generic *ToStore() function above, pointed at IMAGE_STORE_NAME.
function saveImageForComic(comicId, imageBlob) {
  return saveImageToStore(IMAGE_STORE_NAME, comicId, imageBlob);
}
function loadImageForComic(comicId) {
  return loadImageFromStore(IMAGE_STORE_NAME, comicId);
}
function deleteImageForComic(comicId) {
  return deleteImageFromStore(IMAGE_STORE_NAME, comicId);
}

// The character-picture equivalents of the three functions just above -
// same generic *ToStore() functions, just pointed at
// CHARACTER_IMAGE_STORE_NAME instead, and keyed by a character's own id
// rather than a comic's id. See the "Favorite Characters" section
// further down this file for where these get called.
function saveImageForCharacter(characterId, imageBlob) {
  return saveImageToStore(CHARACTER_IMAGE_STORE_NAME, characterId, imageBlob);
}
function loadImageForCharacter(characterId) {
  return loadImageFromStore(CHARACTER_IMAGE_STORE_NAME, characterId);
}
function deleteImageForCharacter(characterId) {
  return deleteImageFromStore(CHARACTER_IMAGE_STORE_NAME, characterId);
}

// A Blob on its own can't be used as an <img>/background-image source
// directly - it first needs to become a "object URL", a special
// temporary browser-only URL (looks like "blob:http://...") that
// points at that Blob's data in memory. Creating one of these is a
// little bit of work, so imageObjectUrlCache remembers the URL we
// already made for each comic id, keyed by that id - meaning every
// place that redraws the shelf (switching tabs, searching, zooming,
// editing) can reuse the SAME url instantly instead of re-reading the
// image out of IndexedDB and making a new one every single time.
const imageObjectUrlCache = new Map();

// Puts a cover image onto one cover box (a card's placeholder on the
// shelf, or the big box on the detail page) as a CSS background-image,
// and adds the "has-image" class that tells style.css to hide the "No
// Cover" text and fill the box with that image (see .cover-placeholder
// .has-image in style.css).
function setCoverElementImage(coverElement, objectUrl) {
  coverElement.style.backgroundImage = 'url(' + objectUrl + ')';
  coverElement.classList.add('has-image');
}

// The reverse of setCoverElementImage(): removes the background image
// and the "has-image" class, so the box falls back to showing its
// plain "No Cover" placeholder text again.
function clearCoverElementImage(coverElement) {
  coverElement.style.backgroundImage = '';
  coverElement.classList.remove('has-image');
}

// Shows a comic's saved cover image on one cover box. Only ever called
// for a comic whose entry.hasImage is true (see renderList() and
// showDetailView() below) - this function's job is just "go get the
// image and display it", not deciding whether one exists.
//
// Reading out of IndexedDB is asynchronous (it can't return the image
// immediately), but redrawing the shelf (renderList()) is not - it
// builds and shows every card in one go. So the very first time a
// comic's image is needed, this box briefly shows as a plain "No
// Cover" placeholder until the IndexedDB read finishes a moment later,
// then the photo pops in. Every render after that first one is
// instant, because imageObjectUrlCache already has the url saved.
function applyCoverImageToElement(coverElement, comicId) {
  const cachedUrl = imageObjectUrlCache.get(comicId);
  if (cachedUrl) {
    setCoverElementImage(coverElement, cachedUrl);
    return;
  }

  loadImageForComic(comicId).then(function (imageBlob) {
    if (!imageBlob) {
      return;
    }

    const objectUrl = URL.createObjectURL(imageBlob);
    imageObjectUrlCache.set(comicId, objectUrl);

    // By the time this IndexedDB read finishes, the shelf might have
    // already been redrawn again for some other reason (e.g. the user
    // switched tabs while this was still loading) - in which case
    // coverElement is a leftover element that's no longer actually on
    // the page. document.body.contains() checks for exactly that, so
    // we don't bother updating an element nobody can see anymore.
    if (document.body.contains(coverElement)) {
      setCoverElementImage(coverElement, objectUrl);
    }
  }).catch(function (error) {
    console.error('Could not load cover image:', error);
  });
}

// Forgets the cached object URL for one comic and frees the memory it
// was using (URL.revokeObjectURL). Called whenever that comic's stored
// image is about to change or be removed, so we're never holding onto
// a url that points at an old, no-longer-correct image.
function forgetCachedImageUrl(comicId) {
  const cachedUrl = imageObjectUrlCache.get(comicId);
  if (cachedUrl) {
    URL.revokeObjectURL(cachedUrl);
    imageObjectUrlCache.delete(comicId);
  }
}

// Same idea as imageObjectUrlCache above, just its own separate Map for
// character pictures rather than comic covers - kept separate (rather
// than sharing one Map for both) just so each cache only ever has to
// think about one kind of id.
const characterImageObjectUrlCache = new Map();

// The character-picture equivalent of applyCoverImageToElement() above -
// same reasoning throughout (check the cache first, otherwise read the
// Blob out of IndexedDB and turn it into an object URL), just pointed
// at loadImageForCharacter()/characterImageObjectUrlCache instead of the
// comic-cover versions.
function applyCharacterImageToElement(imageElement, characterId) {
  const cachedUrl = characterImageObjectUrlCache.get(characterId);
  if (cachedUrl) {
    setCoverElementImage(imageElement, cachedUrl);
    return;
  }

  loadImageForCharacter(characterId).then(function (imageBlob) {
    if (!imageBlob) {
      return;
    }

    const objectUrl = URL.createObjectURL(imageBlob);
    characterImageObjectUrlCache.set(characterId, objectUrl);

    if (document.body.contains(imageElement)) {
      setCoverElementImage(imageElement, objectUrl);
    }
  }).catch(function (error) {
    console.error('Could not load character image:', error);
  });
}

// The character-picture equivalent of forgetCachedImageUrl() above.
function forgetCachedCharacterImageUrl(characterId) {
  const cachedUrl = characterImageObjectUrlCache.get(characterId);
  if (cachedUrl) {
    URL.revokeObjectURL(cachedUrl);
    characterImageObjectUrlCache.delete(characterId);
  }
}

// Builds the small "pencil" (edit) + "trash" (delete) icon button row.
// Shared by the normal card display, the private-mode list row, and
// the private-mode Quick Note row below.
//
// "onEditClick" is optional. Leave it out and Edit does what it
// always did: switch this entry into the big inline edit-inputs form
// (the "isEditing" branch inside renderList()). Pass a function
// instead and Edit calls that function instead - this is what lets
// buildPrivateNoteRow() below reuse this same edit/delete pair for
// Quick Notes, but have Edit open the Quick Note popup instead (a
// note has no chapter/status/type fields for that inline form to
// edit in the first place).
function buildEntryActions(entry, onEditClick) {
  const actionsRow = document.createElement('div');
  actionsRow.className = 'entry-actions';

  const editButton = document.createElement('button');
  editButton.className = 'icon-button edit-button';
  editButton.innerHTML = ICON_PENCIL;
  editButton.title = 'Edit';
  editButton.setAttribute('aria-label', 'Edit');
  editButton.addEventListener('click', function () {
    if (onEditClick) {
      onEditClick();
      return;
    }

    entryBeingEdited = entry;

    // Redraw so this card now renders in the "isEditing" branch above.
    renderList();
  });
  actionsRow.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'icon-button delete-button';
  deleteButton.innerHTML = ICON_TRASH;
  deleteButton.title = 'Delete';
  deleteButton.setAttribute('aria-label', 'Delete');
  deleteButton.addEventListener('click', function () {
    // "entry" here is the exact same object that lives inside
    // manhwaEntries (filter() doesn't copy objects, it just picks
    // which ones to include). So indexOf() finds its real position
    // in the full array - not just the filtered list we're showing -
    // which is what makes this delete work no matter which tab is active.
    const indexToRemove = manhwaEntries.indexOf(entry);
    manhwaEntries.splice(indexToRemove, 1);

    // Also clean up this comic's cover image, if it had one - it's
    // stored separately in IndexedDB (see the "Cover images" section
    // above), so removing the comic from manhwaEntries doesn't
    // automatically remove its image too. Safe to call even when
    // entry.hasImage is false; deleting a key that was never saved is
    // just a no-op.
    deleteImageForComic(entry.id).catch(function (error) {
      console.error('Could not delete cover image:', error);
    });
    forgetCachedImageUrl(entry.id);

    // Save the shorter list to localStorage so the deleted entry
    // doesn't come back after a page refresh.
    saveToStorage();

    // Redraw the shelf so the deleted card disappears immediately
    renderList();
  });
  actionsRow.appendChild(deleteButton);

  return actionsRow;
}

// Fills in one Private-mode row for a comic: the title on the left, a
// plain "<progress> · Status" text next, then the link, then the same
// edit/delete icons on the right. listItem already exists (renderList()
// created it and gave it the "private-row" class) - this function just
// adds the pieces inside it.
function buildPrivateRow(listItem, entry) {
  const titleElement = document.createElement('div');
  titleElement.className = 'private-row-title detail-link-target';
  titleElement.textContent = entry.title;
  // Clicking the title opens this comic's detail page - see the
  // "Detail view" section above for what showDetailView() actually does.
  titleElement.addEventListener('click', function () {
    showDetailView(entry);
  });
  listItem.appendChild(titleElement);

  const infoElement = document.createElement('div');
  infoElement.className = 'private-row-info';
  // formatProgressText() (see the "Type" section near the top of this
  // file) returns something like "Ch. 12" or "Vol. 3, Pg. 45" - or ''
  // if this entry's progress field(s) are blank. Only stick the "·"
  // separator (a plain middle-dot character, not an icon or HTML) in
  // front of the status when there's actually progress text to
  // separate it from.
  const progressText = formatProgressText(entry);
  infoElement.textContent = progressText ? (progressText + ' · ' + entry.status) : entry.status;
  listItem.appendChild(infoElement);

  // Same clickable link as the card view - clicking it pops open the
  // Open/Copy popup instead of opening in a new tab right away, same
  // as everywhere else - see the "Link popup" section near the bottom
  // of this file for wireLinkPopup().
  const linkElement = document.createElement('a');
  linkElement.className = 'entry-link';
  linkElement.href = entry.link;
  // "Link" here is a fixed word we typed ourselves (not user input),
  // so it's fine to include directly in the same HTML string as the icon.
  linkElement.innerHTML = ICON_LINK + ' Link';
  linkElement.target = '_blank';
  linkElement.rel = 'noopener noreferrer';
  wireLinkPopup(linkElement);
  listItem.appendChild(linkElement);

  listItem.appendChild(buildEntryActions(entry));
}

// Fills in one Private-mode row for a Quick Note. Same idea as
// buildPrivateRow() just above, but much simpler: a note has no
// chapter/status/link, just a title, so those pieces are skipped
// entirely instead of being shown blank. listItem already has the
// "private-row" class added by renderList() - the exact same class
// (and CSS) a comic's private row uses - which is what makes a note
// row line up as the same plain, compact row instead of the big
// Cover-mode note card.
function buildPrivateNoteRow(listItem, entry) {
  const titleElement = document.createElement('div');
  titleElement.className = 'private-row-title detail-link-target';
  titleElement.textContent = entry.title;
  // Notes don't have a detail page like comics do, so clicking the
  // title opens the same Quick Note popup used everywhere else a
  // note is opened/edited (see openQuickNoteModal() in the "Quick
  // Notes" section further down).
  titleElement.addEventListener('click', function () {
    openQuickNoteModal(entry);
  });
  listItem.appendChild(titleElement);

  // Same edit/delete icons every other private row gets, just with
  // Edit pointed at the Quick Note popup instead of the inline
  // comic-editing form (see the "onEditClick" comment on
  // buildEntryActions() above for why).
  listItem.appendChild(buildEntryActions(entry, function () {
    openQuickNoteModal(entry);
  }));
}

// --- Detail view ---
// This whole app is ONE HTML page (index.html) - there's no second
// page to navigate to. "Opening the detail page" really just means:
// hide the #libraryView div (the shelf, tabs, search bar, everything)
// and show the #detailView div in its place. "Going back" is the
// exact same trick in reverse. Both divs are sitting in index.html the
// entire time; only their CSS `display` style changes, which is what
// showDetailView() and showLibraryView() below do.
//
// Because currentFilter, currentSearchTerm, and displayMode (the
// active tab, the search box text, and cover/private mode) are never
// touched by either function, the shelf comes back looking exactly
// how it was left the moment showLibraryView() runs - there's nothing
// to "restore", it was never changed in the first place.

// Which entry the detail page is currently showing. The Save Notes
// button (see below) needs this: it has no other way to know which
// comic's notes it should be saving to. Same "store the real object,
// not a copy" approach as entryBeingEdited above, so saving notes
// updates the actual entry inside manhwaEntries.
let currentDetailEntry = null;

// --- Favorite Characters: Add/Edit form state ---
// The #addCharacterForm panel is reused for BOTH adding a brand new
// character and editing an existing one - these four variables are how
// the Save button (see saveCharacterButton's listener below) tells
// those two cases apart and knows what to do with whatever's currently
// in the form.

// null while adding a brand new character; set to that character's own
// "id" while editing an existing one instead (see
// startEditCharacter()/startAddCharacter() below).
let editingCharacterId = null;

// The resized image Blob for whichever picture was just picked in the
// form THIS session (not yet saved to IndexedDB - that only happens
// once "Save Character" is actually clicked). null means no new picture
// has been picked since the form was last opened/reset.
let pickedCharacterImageBlob = null;

// The temporary "blob:..." preview url made straight from
// pickedCharacterImageBlob, purely so the form can show that picture
// immediately without waiting to save it first. Kept separate from
// characterImageObjectUrlCache (which only ever holds urls for
// pictures that ARE actually saved), and always revoked before being
// replaced or thrown away - see resetCharacterFormFields() below.
let pickedCharacterImagePreviewUrl = null;

// true if "Remove Image" was clicked in the form this session - tells
// the Save button "delete this character's existing saved picture (if
// it has one)", the same way pickedCharacterImageBlob tells it "save
// this new picture instead".
let characterImageWasRemoved = false;

// Fills in every field on the detail page for one entry, then swaps
// #detailView into view in place of #libraryView. Quick Notes never call
// this anymore - they have their own popup/modal instead (see the
// "Quick Notes" section further down this file for why a small popup
// made more sense for them than this full-page swap), so this function
// only ever deals with actual comics now.
function showDetailView(entry) {
  currentDetailEntry = entry;

  detailTitle.textContent = entry.title;
  detailCoverColumn.style.display = '';
  detailStatusBadge.style.display = '';
  detailLink.style.display = '';
  detailTags.style.display = '';

  // Same formatProgressText() helper the card and private-mode row use
  // (see the "Type" section near the top of this file) - shows "Ch.
  // 12" / "Vol. 3, Pg. 45" / "Ep. 6" depending on entry.type, or hides
  // this line entirely if the relevant progress field(s) are blank
  // (e.g. a Videos entry with no episode number).
  const progressText = formatProgressText(entry);
  detailChapter.textContent = progressText;
  detailChapter.style.display = progressText ? '' : 'none';

  // Author: only meaningful for Manhwa / Other Comics (see
  // updateAuthorFieldVisibility() near the top of this file), and only
  // shown at all if one was actually typed in - same "hide the whole
  // line rather than show it empty" idea as detailChapter just above.
  // "entry.author || ''" covers comics saved before this feature
  // existed, same fallback pattern used for entry.tags/entry.notes
  // elsewhere in this function.
  const authorText = entry.author || '';
  detailAuthor.textContent = 'Author: ' + authorText;
  detailAuthor.style.display = authorText ? '' : 'none';

  // Same trick renderList() uses for the card's status ribbon: the
  // status name (lowercased) becomes part of the class name (e.g.
  // "status-reading"), which is how style.css knows which color to
  // give this badge.
  detailStatusBadge.textContent = entry.status;
  detailStatusBadge.className = 'detail-status-badge status-' + entry.status.toLowerCase();

  // A comic added without a link has entry.link === ''. An <a> with no
  // href isn't clickable, so we leave href unset in that case and show
  // a plain gray "No link added" message instead of a live link.
  //
  // The visible text is the link itself (entry.link), not a fixed
  // label like "Open Link" - so what you read is exactly where
  // clicking it will take you. textContent (not innerHTML) is used on
  // purpose: entry.link is text the user typed in, and textContent
  // always shows it as plain text no matter what's in it, instead of
  // risking it being read as HTML/code the way innerHTML could.
  if (entry.link) {
    detailLink.href = entry.link;
    detailLink.textContent = entry.link;
    detailLink.classList.remove('detail-link-empty');
  } else {
    detailLink.removeAttribute('href');
    detailLink.textContent = 'No link added';
    detailLink.classList.add('detail-link-empty');
  }

  // "entry.tags || []" covers comics saved before the tags feature
  // existed, same as everywhere else in this file that reads entry.tags.
  buildReadOnlyTagChips(detailTags, entry.tags || []);

  // Star rating: same condition renderList() uses to decide whether to
  // draw stars on the card at all - only Completed comics that have
  // actually been given a rating.
  if (entry.status === 'Completed' && entry.rating !== null && entry.rating !== undefined) {
    detailRating.style.display = '';
    detailRating.innerHTML = buildStarsHTML(entry.rating);
  } else {
    detailRating.style.display = 'none';
    detailRating.innerHTML = '';
  }

  // "entry.notes || ''" covers both a comic that's never had notes
  // saved (entry.notes is undefined) and one saved before this feature
  // existed - either way the textarea just starts empty, never with
  // any placeholder text that could look like a real saved note.
  detailNotesTextarea.value = entry.notes || '';

  // Reset the "Edit" form (see the "Detail page Edit form" section
  // below) back to hidden every time a (possibly different) comic's
  // detail page is opened - same "never show another comic's
  // half-finished form by mistake" idea as addSceneForm/
  // addCharacterForm being reset just below this.
  detailEditForm.style.display = 'none';
  detailViewFields.style.display = '';

  // Favorite Scenes: comics saved before this feature existed have no
  // "scenes" field yet (same idea as the "entry.tags || []" fallback
  // above) - give this entry a real empty array the first time its
  // detail page is opened, so the Save Scene / delete-scene handlers
  // below can always push/splice straight onto entry.scenes without
  // needing to check whether it exists first.
  if (!entry.scenes) {
    entry.scenes = [];
  }
  renderSceneEntries(entry);

  // Reset the "Add Scene" form back to hidden and empty every time a
  // (possibly different) comic's detail page is opened, so it never
  // shows another comic's half-typed scene by mistake.
  addSceneForm.style.display = 'none';
  sceneDescriptionInput.value = '';
  sceneLinkInput.value = '';

  // Favorite Characters: same "comics saved before this feature existed
  // have no 'characters' field yet" backfill as entry.scenes just
  // above, and the same "reset the Add/Edit form back to hidden every
  // time a (possibly different) comic's detail page is opened" idea as
  // the Add Scene form just above it - see resetCharacterFormFields()
  // in the "Favorite Characters" section further down this file.
  if (!entry.characters) {
    entry.characters = [];
  }
  renderCharacterEntries(entry);

  addCharacterForm.style.display = 'none';
  editingCharacterId = null;
  resetCharacterFormFields();

  // Reset the cover box back to its plain "No Cover" state first,
  // then load this comic's real image on top of it if it has one.
  // Doing the reset unconditionally (rather than only in the "else"
  // case) matters because detailCoverBox is one single, reused element
  // - without resetting it first, opening a comic that has no image
  // right after one that DOES have an image would leave the previous
  // comic's photo showing by mistake.
  clearCoverElementImage(detailCoverBox);
  if (entry.hasImage) {
    applyCoverImageToElement(detailCoverBox, entry.id);
  }

  libraryView.style.display = 'none';
  detailView.style.display = 'block';

  // Jump to the top of the page so the Back button (and the rest of
  // the detail page) is visible right away, even if the shelf had
  // been scrolled down when it was clicked.
  window.scrollTo(0, 0);
}

// The reverse of showDetailView(): hide the detail page, show the
// shelf again. See the big comment above this section for why nothing
// else needs to happen here for the tab/search/privacy mode to "come
// back" correctly.
function showLibraryView() {
  detailView.style.display = 'none';
  libraryView.style.display = 'block';

  // If a character was reached from the Characters tab, its comic's
  // detail page lets you add/edit/delete characters (see the
  // "Favorite Characters" section above) - so the combined list
  // needs a fresh rebuild here, in case what it should show just
  // changed. currentFilter is still 'Characters' at this point (it's
  // never touched by opening/closing a comic's detail page), so
  // checking it here is what makes Back return to the Characters tab
  // itself, not whichever comic-status tab was active before it.
  if (currentFilter === 'Characters') {
    renderCharactersList();
  }
}

backButton.addEventListener('click', showLibraryView);

// Save Notes button: copies whatever's currently typed in the
// textarea onto the entry that's currently open (currentDetailEntry),
// then saves the whole manhwaEntries array to localStorage the same
// way every other edit in this app does - so the notes are still
// there next time this comic's detail page is opened, even after a
// page refresh.
saveNotesButton.addEventListener('click', function () {
  currentDetailEntry.notes = detailNotesTextarea.value;
  saveToStorage();

  // Quick "Saved!" confirmation on the button itself, then switch the
  // label back after a second - just enough feedback to confirm the
  // click did something, without needing a popup or alert().
  saveNotesButton.textContent = 'Saved!';
  setTimeout(function () {
    saveNotesButton.textContent = 'Save Notes';
  }, 1000);
});

// --- Detail page "Edit" form ---
// This is a SECOND place you can edit a comic's basic fields (title,
// type, author, progress, link, status, tags, rating) - the first is
// the pencil icon on the card itself, over in the "isEditing" branch
// of renderList(). Both edit the exact same entry object (the one
// currentDetailEntry is pointing at, which is also the one sitting
// inside the manhwaEntries array), so there's no syncing step needed
// between them: whichever one you save with, the change is already
// "the real data" - the other edit screen just hasn't been redrawn to
// show it yet, and will as soon as it's opened/reopened.
//
// The field list, the "type/status change live-toggles other fields"
// behavior, and the copy-the-tags-array-until-Save-is-clicked trick
// below are all deliberately copied from that same card edit mode -
// see its own comments for the reasoning, which applies here unchanged.

// Bundles the detail-edit-form's four progress fields together so
// updateProgressFieldsVisibility() (see the "Type" section near the
// top of this file) can be reused here exactly like it is for the
// Add-entry form and the card's edit mode.
const editEntryProgressFields = {
  chapterField: editEntryChapter,
  volumeField: editEntryVolume,
  pageField: editEntryPage,
  episodeField: editEntryEpisode
};

// Holds the tags being built up while the edit form is open - a
// *copy* of currentDetailEntry.tags (made fresh each time the form is
// opened, see openDetailEditForm() below), not currentDetailEntry.tags
// itself. That's what makes "Cancel" work: adding/removing chips only
// ever changes this array, so if Cancel is clicked instead of Save,
// currentDetailEntry.tags was never touched and nothing needs to be
// undone.
let detailEditTags = [];

// Fills every field in #detailEditForm with currentDetailEntry's
// current values, then swaps it in for #detailViewFields. Called by
// editEntryButton's click handler below.
function openDetailEditForm() {
  const entry = currentDetailEntry;

  editEntryTitle.value = entry.title;
  editEntryType.value = entry.type;
  editEntryAuthor.value = entry.author || '';
  editEntryChapter.value = entry.chapter || '';
  editEntryVolume.value = entry.volume || '';
  editEntryPage.value = entry.page || '';
  editEntryEpisode.value = entry.episode || '';
  editEntryLink.value = entry.link || '';
  editEntryStatus.value = entry.status;
  editEntryRating.value = (entry.rating === null || entry.rating === undefined) ? '' : entry.rating;

  updateAuthorFieldVisibility(entry.type, editEntryAuthor);
  updateProgressFieldsVisibility(entry.type, editEntryProgressFields);
  editEntryRating.style.display = (entry.status === 'Completed') ? '' : 'none';

  detailEditTags = (entry.tags || []).slice();
  renderTagChips(editEntryTagsPreview, detailEditTags);
  editEntryTagInput.value = '';

  detailViewFields.style.display = 'none';
  detailEditForm.style.display = 'flex';
}

editEntryButton.addEventListener('click', openDetailEditForm);

// Type dropdown changing live-toggles the Author field and the
// progress field(s) shown below it, same as the card's edit mode.
editEntryType.addEventListener('change', function () {
  updateAuthorFieldVisibility(editEntryType.value, editEntryAuthor);
  updateProgressFieldsVisibility(editEntryType.value, editEntryProgressFields);
});

// Status dropdown changing live-toggles the Rating field, same as the
// card's edit mode.
editEntryStatus.addEventListener('change', function () {
  editEntryRating.style.display = (editEntryStatus.value === 'Completed') ? '' : 'none';
});

// Tag editor: same "Add Tag" button + Enter-key shortcut as the
// Add-comic form and the card's edit mode - see addTagFromInput() near
// the top of this file.
editEntryTagAddButton.addEventListener('click', function () {
  addTagFromInput(editEntryTagInput, detailEditTags, editEntryTagsPreview);
});

editEntryTagInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTagFromInput(editEntryTagInput, detailEditTags, editEntryTagsPreview);
  }
});

// "Cancel": just hide the form and go back to the plain read-only
// fields. Nothing was ever written onto currentDetailEntry, so there's
// nothing to undo - the next time the form is opened,
// openDetailEditForm() fills it in fresh from currentDetailEntry again.
cancelEntryEditButton.addEventListener('click', function () {
  detailEditForm.style.display = 'none';
  detailViewFields.style.display = '';
});

// "Save": writes every field straight onto currentDetailEntry - the
// same object that's sitting inside manhwaEntries, and the same object
// the pencil-icon card edit writes onto - so this is genuinely the one
// underlying entry being updated, not a separate copy. Then saves to
// localStorage (same as every other edit in this app) and re-runs
// showDetailView() on this same entry to redraw the read-only fields
// with the new values, plus renderList() so the card behind this page
// (e.g. its status ribbon, or which tab it belongs in if Type changed)
// is already correct by the time Back is clicked.
saveEntryEditButton.addEventListener('click', function () {
  const entry = currentDetailEntry;

  entry.title = editEntryTitle.value;
  entry.type = editEntryType.value;
  // Videos entries don't have an Author (see updateAuthorFieldVisibility()
  // above) - force it blank even if Type was just switched to Videos
  // while text was still sitting in the now-hidden Author field.
  entry.author = (editEntryType.value === 'Videos') ? '' : editEntryAuthor.value;
  entry.chapter = editEntryChapter.value;
  entry.volume = editEntryVolume.value;
  entry.page = editEntryPage.value;
  entry.episode = editEntryEpisode.value;
  entry.link = editEntryLink.value;
  entry.status = editEntryStatus.value;

  // detailEditTags already holds exactly the tags built up via the
  // chips above - assigning it here is what finally commits those
  // changes onto the real entry.
  entry.tags = detailEditTags;

  // Only keep a rating for Completed comics, same rule as the card's
  // edit mode.
  if (editEntryStatus.value === 'Completed') {
    entry.rating = editEntryRating.value === '' ? null : parseFloat(editEntryRating.value);
  } else {
    entry.rating = null;
  }

  saveToStorage();

  showDetailView(entry);
  renderList();
});

// "Add Scene" button: just reveals the description/link form below it
// (starting empty) and moves keyboard focus into the description box,
// ready to type. Nothing is saved yet - that only happens once "Save
// Scene" is clicked below.
addSceneButton.addEventListener('click', function () {
  addSceneForm.style.display = 'flex';
  sceneDescriptionInput.focus();
});

// "Cancel" button inside the Add Scene form: hides the form again and
// clears out whatever had been typed, without saving anything.
cancelSceneButton.addEventListener('click', function () {
  addSceneForm.style.display = 'none';
  sceneDescriptionInput.value = '';
  sceneLinkInput.value = '';
});

// "Save Scene" button: reads the description + link that were typed
// into the form, and - as long as a description was actually entered -
// adds them as one new scene object onto the comic currently open
// (currentDetailEntry.scenes), the same "push onto the array, then
// save + redraw" pattern used everywhere else in this file. The link
// is allowed to be left blank (renderSceneEntries() shows "No link
// added" for those, same as the comic's own link field), but the
// description is required - a scene with no description would just
// show up as a blank row, which would look broken.
saveSceneButton.addEventListener('click', function () {
  const description = sceneDescriptionInput.value.trim();
  const link = sceneLinkInput.value.trim();

  if (description === '') {
    alert('Please enter a description before saving this scene.');
    return;
  }

  currentDetailEntry.scenes.push({
    description: description,
    link: link
  });

  saveToStorage();
  renderSceneEntries(currentDetailEntry);

  addSceneForm.style.display = 'none';
  sceneDescriptionInput.value = '';
  sceneLinkInput.value = '';
});

// Puts the Add/Edit Character form back into its "nothing picked"
// state: empty name, empty file input, no pending image Blob, and the
// preview box back to showing the plain placeholder. Called every time
// the form is opened fresh (for either Add or Edit) and every time it's
// closed (Cancel, Save, or switching to a different comic entirely),
// so it never carries anything left over from a previous character into
// the next time it's opened.
function resetCharacterFormFields() {
  characterNameInput.value = '';
  characterImageInput.value = '';

  if (pickedCharacterImagePreviewUrl) {
    URL.revokeObjectURL(pickedCharacterImagePreviewUrl);
    pickedCharacterImagePreviewUrl = null;
  }
  pickedCharacterImageBlob = null;
  characterImageWasRemoved = false;

  clearCoverElementImage(characterFormPreviewBox);
}

// "Add Character" button: opens the form empty and ready for a brand
// new character. editingCharacterId = null is what tells the Save
// button (below) that this is an ADD rather than an EDIT.
addCharacterButton.addEventListener('click', function () {
  editingCharacterId = null;
  resetCharacterFormFields();
  addCharacterForm.style.display = 'flex';
  characterNameInput.focus();
});

// Each character row's pencil/Edit button (see renderCharacterEntries()
// above) calls this with that character. Opens the exact same form as
// "Add Character" above, just pre-filled with this character's current
// name and picture instead of starting blank.
function startEditCharacter(character) {
  editingCharacterId = character.id;
  resetCharacterFormFields();
  characterNameInput.value = character.name;

  if (character.hasImage) {
    applyCharacterImageToElement(characterFormPreviewBox, character.id);
  }

  addCharacterForm.style.display = 'flex';
  characterNameInput.focus();
}

// "Cancel" inside the Add/Edit Character form: closes it and throws
// away anything typed/picked, without saving anything - same idea as
// cancelSceneButton above.
cancelCharacterButton.addEventListener('click', function () {
  addCharacterForm.style.display = 'none';
  resetCharacterFormFields();
  editingCharacterId = null;
});

// Fires once a file is actually picked from the form's "Choose Image"
// dialog. Unlike a comic's own cover image (which saves straight to
// IndexedDB the moment a photo is picked - see coverImageInput's
// listener below), a character's picture is only kept as a Blob in
// memory (pickedCharacterImageBlob) until "Save Character" is actually
// clicked. That's necessary here specifically because this form also
// has a Cancel button: saving to IndexedDB immediately, the way the
// cover picker does, would leave an orphaned picture behind in
// IndexedDB for a character that was never actually added.
characterImageInput.addEventListener('change', function () {
  const pickedFile = characterImageInput.files[0];
  if (!pickedFile) {
    return;
  }

  resizeImageFile(pickedFile, MAX_CHARACTER_IMAGE_WIDTH)
    .then(function (resizedBlob) {
      // Forget the preview from whatever was picked earlier in this
      // same form session (if anything), so we don't leak its url.
      if (pickedCharacterImagePreviewUrl) {
        URL.revokeObjectURL(pickedCharacterImagePreviewUrl);
      }

      pickedCharacterImageBlob = resizedBlob;
      characterImageWasRemoved = false;

      pickedCharacterImagePreviewUrl = URL.createObjectURL(resizedBlob);
      setCoverElementImage(characterFormPreviewBox, pickedCharacterImagePreviewUrl);
    })
    .catch(function (error) {
      console.error('Could not use that character image:', error);
      alert('Sorry, that image could not be used. Please try a different photo.');
    })
    .finally(function () {
      // Same reason as coverImageInput's own listener below: clears the
      // input so picking the exact same file again still fires "change".
      characterImageInput.value = '';
    });
});

// "Remove Image" inside the form: clears whatever picture is currently
// showing in the preview - whether that's a new one just picked above,
// or (while editing) the character's existing saved picture - back to
// the plain placeholder. Nothing is actually deleted from IndexedDB
// yet; characterImageWasRemoved just tells the Save button (below) to
// do that once Save is actually clicked.
removeCharacterImageButton.addEventListener('click', function () {
  if (pickedCharacterImagePreviewUrl) {
    URL.revokeObjectURL(pickedCharacterImagePreviewUrl);
    pickedCharacterImagePreviewUrl = null;
  }
  pickedCharacterImageBlob = null;
  characterImageWasRemoved = true;

  clearCoverElementImage(characterFormPreviewBox);
});

// Shared "we're done" step for the Save button below, once whatever
// (if anything) needed to happen to this character's picture in
// IndexedDB has finished: save the updated comic entry (characters live
// inside it, so saving the whole entry is what actually persists the
// character), redraw the character list, and close/reset the form.
function finishSavingCharacter(entry) {
  saveToStorage();
  renderCharacterEntries(entry);

  addCharacterForm.style.display = 'none';
  resetCharacterFormFields();
  editingCharacterId = null;
}

// "Save Character" button: reads the name typed into the form and -
// as long as one was actually entered - either adds a brand new
// character (editingCharacterId is null) or updates the existing one
// being edited, same "push/find, then save + redraw" pattern used
// throughout this file.
saveCharacterButton.addEventListener('click', function () {
  const name = characterNameInput.value.trim();

  if (name === '') {
    alert('Please enter a name before saving this character.');
    return;
  }

  const entry = currentDetailEntry;
  let character;

  if (editingCharacterId === null) {
    // Adding a brand new character: give it its own id up front (the
    // same way a new comic gets one - see generateComicId()), since
    // that id is needed immediately below if a picture was picked too.
    character = {
      id: generateCharacterId(),
      name: name,
      hasImage: false
    };
    entry.characters.push(character);
  } else {
    character = entry.characters.find(function (existingCharacter) {
      return existingCharacter.id === editingCharacterId;
    });
  }

  character.name = name;

  if (pickedCharacterImageBlob) {
    // A new picture was picked in this form session - save it into
    // IndexedDB under this character's own id, the exact same way a
    // comic's own cover photo is saved under ITS id (see
    // saveImageForComic, right alongside saveImageForCharacter in the
    // "Cover images" section further up this file).
    saveImageForCharacter(character.id, pickedCharacterImageBlob)
      .then(function () {
        // This character might already have had an older picture cached
        // from before - forget it before caching the new one, same
        // reasoning as coverImageInput's own listener below.
        forgetCachedCharacterImageUrl(character.id);
        character.hasImage = true;
        finishSavingCharacter(entry);
      })
      .catch(function (error) {
        console.error('Could not save character image:', error);
        alert('Sorry, that image could not be saved. The character will be saved without it.');
        character.hasImage = false;
        finishSavingCharacter(entry);
      });
  } else if (characterImageWasRemoved && character.hasImage) {
    // "Remove Image" was clicked on a character that had a real saved
    // picture - actually delete it from IndexedDB now that Save has
    // been clicked (see the removeCharacterImageButton listener above
    // for why this is deferred until now instead of happening
    // immediately).
    deleteImageForCharacter(character.id)
      .then(function () {
        forgetCachedCharacterImageUrl(character.id);
        character.hasImage = false;
        finishSavingCharacter(entry);
      })
      .catch(function (error) {
        console.error('Could not remove character image:', error);
        finishSavingCharacter(entry);
      });
  } else {
    // No picture change at all this time - just save the name (and,
    // for a brand new character, the fact that it now exists).
    finishSavingCharacter(entry);
  }
});

// Shared by each character row's trash/Delete button (see
// renderCharacterEntries() above) - removes just this one character
// (by its position in entry.characters) and its saved picture (if any),
// same ".splice() + clean up IndexedDB + save + redraw" pattern
// buildEntryActions() uses to delete a whole comic.
function deleteCharacter(entry, character) {
  const indexToRemove = entry.characters.indexOf(character);
  entry.characters.splice(indexToRemove, 1);

  deleteImageForCharacter(character.id).catch(function (error) {
    console.error('Could not delete character image:', error);
  });
  forgetCachedCharacterImageUrl(character.id);

  saveToStorage();
  renderCharacterEntries(entry);

  // If the character just deleted is the one currently open in the
  // Add/Edit form, close that form too instead of leaving it pointed at
  // a character that no longer exists.
  if (editingCharacterId === character.id) {
    addCharacterForm.style.display = 'none';
    resetCharacterFormFields();
    editingCharacterId = null;
  }
}

// Fires once a file is actually picked from the "Choose Image" dialog
// (clicking the <label> just opens that dialog - this is a separate
// event for once the user has actually chosen something in it).
coverImageInput.addEventListener('change', function () {
  const pickedFile = coverImageInput.files[0];
  if (!pickedFile || !currentDetailEntry) {
    return;
  }

  const entry = currentDetailEntry;

  resizeImageFile(pickedFile, MAX_COVER_IMAGE_WIDTH)
    .then(function (resizedBlob) {
      return saveImageForComic(entry.id, resizedBlob).then(function () {
        // This comic may already have had an older image cached from
        // before - forget that cached url (and free its memory) before
        // caching the new one, so nothing keeps pointing at the old photo.
        forgetCachedImageUrl(entry.id);
        const newObjectUrl = URL.createObjectURL(resizedBlob);
        imageObjectUrlCache.set(entry.id, newObjectUrl);

        entry.hasImage = true;
        saveToStorage();

        // Update the big cover on this detail page immediately...
        setCoverElementImage(detailCoverBox, newObjectUrl);
        // ...and redraw the shelf so this comic's card thumbnail picks
        // up the same new image too (it'll use the url we just cached
        // above, so this redraw shows it instantly - no extra loading
        // moment on the shelf).
        renderList();
      });
    })
    .catch(function (error) {
      console.error('Could not save cover image:', error);
      alert('Sorry, that image could not be used. Please try a different photo.');
    })
    .finally(function () {
      // Clear the file input's value so picking the exact same file
      // again later still fires this "change" event (without this,
      // selecting an identical file twice in a row would be silently
      // ignored, since the input's value wouldn't have "changed").
      coverImageInput.value = '';
    });
});

// "Remove Image" button: deletes this comic's saved image out of
// IndexedDB entirely and reverts the cover back to the default
// placeholder, both here on the detail page and on the shelf.
removeCoverImageButton.addEventListener('click', function () {
  const entry = currentDetailEntry;
  if (!entry) {
    return;
  }

  deleteImageForComic(entry.id)
    .then(function () {
      forgetCachedImageUrl(entry.id);

      entry.hasImage = false;
      saveToStorage();

      clearCoverElementImage(detailCoverBox);
      renderList();
    })
    .catch(function (error) {
      console.error('Could not remove cover image:', error);
    });
});

// Rebuilds the <ul> on the page from the manhwaEntries array
function renderList() {
  // The "Characters" tab shows something completely different from
  // every other tab - one combined list of characters (see
  // renderCharactersList() above), not the comic shelf at all - so it
  // gets its own early branch here, before any of the normal
  // comic-card building below even starts. "return" at the end of this
  // branch means none of the shelf-building code further down runs.
  if (currentFilter === 'Characters') {
    manhwaList.style.display = 'none';
    // '' (not 'grid') so this falls back to whatever style.css already
    // says #charactersList should be - which is "display: grid" (see
    // ".characters-list" in style.css), the same card-grid layout
    // #manhwaList uses for its own comic cards.
    charactersList.style.display = '';
    renderCharactersList();
    return;
  }

  // Any other tab: make sure charactersList is hidden and manhwaList
  // is showing again. manhwaList.style.display is set back to '' (not
  // 'grid') so it falls back to whatever style.css already says it
  // should be - which matters because style.css itself switches
  // #manhwaList between a grid (normal/"Cover" mode) and a single
  // column of rows (Private mode, see "body.private-mode #manhwaList"
  // in style.css) depending on the privacy toggle. Hardcoding 'grid'
  // here would silently break that Private-mode layout every time you
  // navigated away from the Characters tab.
  manhwaList.style.display = '';
  charactersList.style.display = 'none';

  // Clear out whatever is currently shown
  manhwaList.innerHTML = '';

  // .filter() walks the full array and builds a new, shorter array
  // containing only the entries where the callback returns true.
  // It never changes manhwaEntries itself - it just picks which of
  // those entries get shown this time.
  //
  // This is where the folder tab and the search box combine: an entry
  // only makes it onto the shelf if it passes BOTH checks below, one
  // right after the other. That "both" is what makes search feel like
  // it's narrowing down whichever tab you're already on, instead of
  // searching the whole library regardless of tab.
  const entriesToShow = manhwaEntries.filter(function (entry) {
    // --- Check 1: does this entry belong to the active folder tab? ---
    // "All" means nothing gets filtered out by this check; any other
    // tab ("Manhwa", "Other Comics", or "Videos") only lets through
    // entries whose type matches that tab. This compares against
    // entry.type (not entry.status) - see typeInput in index.html for
    // where that value comes from when a comic is added.
    const matchesFolder = (currentFilter === 'All') || (entry.type === currentFilter);

    if (!matchesFolder) {
      // Already fails the folder check - no need to even look at the
      // search term, this entry is out either way.
      return false;
    }

    // --- Check 1b: does this entry match the active type tab's OWN status filter? ---
    // Only type tabs (Manhwa/Other Comics/Videos) have a status filter
    // at all - the top-level "All" tab has no #statusFilterRow (see
    // index.html), so it always shows every status, same as before.
    // When a type tab's own filter state is 'All' (see
    // typeStatusFilters above), this check is skipped too - it only
    // narrows things down once a specific status has been picked.
    if (currentFilter !== 'All') {
      const filterState = typeStatusFilters[currentFilter];
      if (filterState.mode === 'Status' && entry.status !== filterState.status) {
        return false;
      }
    }

    // --- Check 2: does this entry match what's typed in the search box? ---
    // An empty search term means nothing has been typed, so every
    // entry that already passed the folder check counts as a match.
    if (currentSearchTerm === '') {
      return true;
    }

    // entry.title.toLowerCase() so "Solo" also matches a search for
    // "solo" - the search box is meant to be case-insensitive.
    // .includes() (rather than "===") is what makes this a *partial*
    // match: searching "isek" matches a title/tag containing "isekai"
    // anywhere inside it, not just an exact "isek".
    const titleMatches = entry.title.toLowerCase().includes(currentSearchTerm);

    // "entry.tags || []" covers comics saved before the tags feature
    // existed (see the same pattern up in the edit-mode code above).
    // .some() checks each tag and stops as soon as one matches. This
    // is also what makes search work correctly in Private mode: tags
    // aren't drawn on screen there, but they're still real data sitting
    // on "entry", so this check still runs against them either way -
    // search isn't just matching what's visible, it's matching the
    // underlying data regardless of which display mode is active.
    const tagsMatch = (entry.tags || []).some(function (tag) {
      return tag.toLowerCase().includes(currentSearchTerm);
    });

    return titleMatches || tagsMatch;
  });

  entriesToShow.forEach(function (entry) {
    // Each <li> is one card (or, in Private mode, one row) on the
    // shelf. The CSS grid on #manhwaList arranges these into
    // rows/columns; the flexbox on the <li> itself just stacks this
    // item's own pieces (in Cover mode: vertically, top to bottom; in
    // Private mode: horizontally, left to right - see ".private-row"
    // in style.css).
    const listItem = document.createElement('li');

    // Private mode + a Quick Note: draw the same plain, compact row
    // every other private entry gets instead of the big Cover-mode
    // note card below. This check has to come BEFORE the plain
    // "entry.type === 'Note'" branch right after it - that branch
    // used to run unconditionally for every note regardless of
    // displayMode, which was the actual bug: it always built the
    // large 16:9 Cover-mode card (see "#manhwaList li.note-card" in
    // style.css), even in Private mode where every other entry type
    // was already switching to the small text-row layout. Checking
    // Private mode first, here, is what makes notes follow that same
    // switch instead of being stuck at Cover-mode size always.
    if (displayMode === 'private' && entry.type === 'Note') {
      listItem.classList.add('private-row');
      buildPrivateNoteRow(listItem, entry);
      manhwaList.appendChild(listItem);
      return;
    }

    // Quick Notes get their own much simpler card, built here as an
    // early branch before any of the comic-card code below even runs -
    // a note has no status/chapter/cover/link/etc. for that code to
    // read, and (unlike a comic card) a note card has no separate
    // Edit/Delete icons of its own at all: the whole card is just one
    // big click target that opens the Quick Note popup (see
    // openQuickNoteModal() in the "Quick Notes" section further down
    // this file), where editing/deleting actually happens. "return"
    // here skips straight to the next entry, same as the Private-mode
    // row branch just below this one does. (This branch only runs in
    // Cover mode now - the Private-mode case is already handled and
    // returned above.)
    if (entry.type === 'Note') {
      listItem.className = 'note-card detail-link-target';

      const noteTitleElement = document.createElement('div');
      noteTitleElement.className = 'note-card-title';
      noteTitleElement.textContent = entry.title;
      listItem.appendChild(noteTitleElement);

      const noteSnippetElement = document.createElement('div');
      noteSnippetElement.className = 'note-card-snippet';
      noteSnippetElement.textContent = buildNoteSnippet(entry.noteText);
      listItem.appendChild(noteSnippetElement);

      listItem.addEventListener('click', function () {
        openQuickNoteModal(entry);
      });

      manhwaList.appendChild(listItem);
      return;
    }

    // "entry === entryBeingEdited" checks whether THIS card is the one
    // the user clicked "Edit" on. Since entryBeingEdited holds the same
    // object reference (not a copy), this comparison works even though
    // entriesToShow was rebuilt fresh by .filter() above.
    const isEditing = entry === entryBeingEdited;

    // Private mode, and not currently being edited: draw the plain
    // text row instead of a card and skip straight to the next entry.
    // (Clicking "Edit" on a private row still opens the same full
    // card-style edit form as Cover mode does - that form isn't part
    // of what the privacy toggle controls, so it falls through to the
    // normal card code below instead of being duplicated here.)
    if (displayMode === 'private' && !isEditing) {
      listItem.classList.add('private-row');
      buildPrivateRow(listItem, entry);
      manhwaList.appendChild(listItem);
      return;
    }

    // Every entry gets this same placeholder box. The "No Cover" text
    // lives inside its own <span> (rather than being coverPlaceholder's
    // whole textContent) so that, for a comic that HAS a saved image,
    // applyCoverImageToElement() below can hide just the text and add
    // the photo as a background-image without disturbing the status
    // ribbon that also lives inside this same box (appended further
    // down).
    const coverPlaceholder = document.createElement('div');
    coverPlaceholder.className = 'cover-placeholder';
    // Videos get a wide/short thumbnail shape instead of the tall
    // portrait cover shape - see ".cover-placeholder.video-cover" in
    // style.css for the actual size change. Manhwa and Other Comics
    // don't get this class, so their cards are untouched.
    if (entry.type === 'Videos') {
      coverPlaceholder.classList.add('video-cover');
    }
    const coverPlaceholderText = document.createElement('span');
    coverPlaceholderText.className = 'cover-placeholder-text';
    coverPlaceholderText.textContent = 'No Cover';
    coverPlaceholder.appendChild(coverPlaceholderText);
    listItem.appendChild(coverPlaceholder);

    // Comics added before the cover-image feature existed (or that
    // just never had one picked) have hasImage: false - for those we
    // leave the box exactly as built above, showing the plain "No
    // Cover" placeholder. Nothing else changes for them.
    if (entry.hasImage) {
      applyCoverImageToElement(coverPlaceholder, entry.id);
    }

    if (isEditing) {
      // --- Edit mode: plain text swapped for editable inputs ---

      // Each input starts pre-filled with the entry's current value,
      // so the user is editing what's already there instead of
      // starting from a blank field.
      const titleField = document.createElement('input');
      titleField.type = 'text';
      titleField.className = 'edit-input';
      titleField.value = entry.title;
      listItem.appendChild(titleField);

      // Type dropdown: same three choices as the Add-entry form's
      // #typeInput, built from ENTRY_TYPES (see the "Type" section near
      // the top of this file) instead of retyping each <option>.
      // Changing this live-toggles which progress field(s) below are
      // shown, the same way the status dropdown further down
      // live-toggles the rating field.
      const typeField = document.createElement('select');
      typeField.className = 'edit-input';
      ENTRY_TYPES.forEach(function (type) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (type === entry.type) {
          option.selected = true;
        }
        typeField.appendChild(option);
      });
      listItem.appendChild(typeField);

      // Author: same "Manhwa / Other Comics only" idea as #authorInput
      // in the Add-entry form - see updateAuthorFieldVisibility() near
      // the top of this file. "entry.author || ''" covers comics saved
      // before this feature existed (entry.author is undefined for
      // those), same fallback pattern used for entry.tags elsewhere.
      const authorField = document.createElement('input');
      authorField.type = 'text';
      authorField.className = 'edit-input';
      authorField.placeholder = 'Author';
      authorField.value = entry.author || '';
      listItem.appendChild(authorField);

      // Show/hide the Author field to match this entry's current type
      // to start with, and keep it in sync live if the type dropdown
      // is changed while editing - same idea as updateProgressFieldsVisibility()
      // just below for the four progress fields.
      updateAuthorFieldVisibility(entry.type, authorField);
      typeField.addEventListener('change', function () {
        updateAuthorFieldVisibility(typeField.value, authorField);
      });

      // The four progress fields - same idea as the Add-entry form's
      // chapterInput/volumeInput/pageInput/episodeInput, just built
      // fresh here since this whole edit-mode section only exists
      // while a card is being edited. All four are always created and
      // pre-filled with the entry's current value (even the ones not
      // shown right now) so switching the type dropdown back and forth
      // never loses whatever was already typed into any of them.
      const chapterField = document.createElement('input');
      chapterField.type = 'text';
      chapterField.className = 'edit-input';
      chapterField.placeholder = 'Chapter #';
      chapterField.value = entry.chapter;
      listItem.appendChild(chapterField);

      const volumeField = document.createElement('input');
      volumeField.type = 'text';
      volumeField.className = 'edit-input';
      volumeField.placeholder = 'Volume #';
      volumeField.value = entry.volume;
      listItem.appendChild(volumeField);

      const pageField = document.createElement('input');
      pageField.type = 'text';
      pageField.className = 'edit-input';
      pageField.placeholder = 'Page #';
      pageField.value = entry.page;
      listItem.appendChild(pageField);

      const episodeField = document.createElement('input');
      episodeField.type = 'text';
      episodeField.className = 'edit-input';
      episodeField.placeholder = 'Episode # (optional)';
      episodeField.value = entry.episode;
      listItem.appendChild(episodeField);

      // Bundle the four fields together so updateProgressFieldsVisibility()
      // (see the "Type" section near the top of this file) can be reused
      // here exactly like it is for the Add-entry form.
      const editProgressFields = {
        chapterField: chapterField,
        volumeField: volumeField,
        pageField: pageField,
        episodeField: episodeField
      };

      // Show only the field(s) that match this entry's current type to
      // start with...
      updateProgressFieldsVisibility(entry.type, editProgressFields);

      // ...and keep that in sync live if the type dropdown is changed
      // while editing, same as the status dropdown does for the rating
      // field just below.
      typeField.addEventListener('change', function () {
        updateProgressFieldsVisibility(typeField.value, editProgressFields);
      });

      // Same four choices as the "Add" form's dropdown, built from the
      // STATUS_OPTIONS list instead of retyping each <option>.
      const statusField = document.createElement('select');
      statusField.className = 'edit-input';
      STATUS_OPTIONS.forEach(function (status) {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        if (status === entry.status) {
          option.selected = true;
        }
        statusField.appendChild(option);
      });
      listItem.appendChild(statusField);

      // Rating input: only relevant when the comic is Completed, so it
      // starts hidden (via style.display) unless entry.status already
      // is "Completed". A plain number input with step="0.5" already
      // gives the browser's own up/down arrows 0.5 increments for
      // free, so we don't need any custom star-clicking widget here.
      // If entry.rating is null (never rated, or rating was reset),
      // the field is left blank instead of showing "0".
      const ratingField = document.createElement('input');
      ratingField.type = 'number';
      ratingField.className = 'edit-input rating-edit-input';
      ratingField.min = '0';
      ratingField.max = '5';
      ratingField.step = '0.5';
      ratingField.placeholder = 'Rating (0-5)';
      ratingField.value = (entry.rating === null || entry.rating === undefined) ? '' : entry.rating;
      ratingField.style.display = (entry.status === 'Completed') ? '' : 'none';
      listItem.appendChild(ratingField);

      // Show/hide the rating field live as the user changes the status
      // dropdown, without needing to save first. This is what makes
      // "only show the rating when Completed" work while still editing,
      // not just after the card is redrawn.
      statusField.addEventListener('change', function () {
        ratingField.style.display = (statusField.value === 'Completed') ? '' : 'none';
      });

      const linkField = document.createElement('input');
      linkField.type = 'text';
      linkField.className = 'edit-input';
      linkField.placeholder = 'Link (URL)';
      linkField.value = entry.link;
      listItem.appendChild(linkField);

      // Tag editor: same idea as the Add-comic form's tag picker, just
      // built with document.createElement() instead of already being
      // in index.html, since this whole edit-mode section only exists
      // while a card is being edited.
      //
      // editingTags starts as a *copy* of entry.tags (via .slice()) -
      // not entry.tags itself. That matters: while the chips here are
      // being added to/removed from, we want entry.tags (the real
      // saved data) to stay untouched until "Save" is actually
      // clicked, exactly like titleField/chapterField/etc. below only
      // write back to "entry" inside the Save button's click handler.
      // If we skipped .slice() and pointed editingTags straight at
      // entry.tags, every add/remove would edit the real data
      // immediately, and clicking away without saving wouldn't cancel
      // anything.
      //
      // "entry.tags || []" covers comics saved before this tags
      // feature existed - their entry.tags is undefined, and
      // undefined has no .slice() method, so we fall back to a fresh
      // empty array instead.
      const editingTags = (entry.tags || []).slice();

      const tagEditor = document.createElement('div');
      tagEditor.className = 'tag-editor';

      const tagChipsContainer = document.createElement('div');
      tagChipsContainer.className = 'tags-preview';
      renderTagChips(tagChipsContainer, editingTags);

      const tagInputRow = document.createElement('div');
      tagInputRow.className = 'tag-input-row';

      const tagField = document.createElement('input');
      tagField.type = 'text';
      tagField.className = 'edit-input';
      tagField.placeholder = 'Add a tag';

      const tagAddButton = document.createElement('button');
      tagAddButton.type = 'button';
      tagAddButton.textContent = 'Add Tag';
      tagAddButton.addEventListener('click', function () {
        addTagFromInput(tagField, editingTags, tagChipsContainer);
      });

      // Let Enter add the tag too, so you don't have to reach for the
      // button every time. preventDefault() stops the Enter key's
      // default behavior (which, inside a <form>, would try to submit
      // it) - not strictly needed here since there's no <form>, but
      // it's the correct thing to do any time you're handling Enter
      // yourself inside a text input.
      tagField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          addTagFromInput(tagField, editingTags, tagChipsContainer);
        }
      });

      tagInputRow.appendChild(tagField);
      tagInputRow.appendChild(tagAddButton);
      tagEditor.appendChild(tagChipsContainer);
      tagEditor.appendChild(tagInputRow);
      listItem.appendChild(tagEditor);

      // Button to confirm the changes and go back to normal display.
      const saveButton = document.createElement('button');
      saveButton.className = 'save-button';
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', function () {
        // Write the input values straight onto the entry object. Since
        // "entry" is the same object stored inside manhwaEntries (not
        // a copy), changing its properties here changes the real data
        // - there's no separate "save it back to the array" step needed.
        entry.title = titleField.value;
        entry.type = typeField.value;
        // Videos entries don't have an Author (see
        // updateAuthorFieldVisibility() above) - force it blank here
        // even if the type was just switched to Videos while some
        // text was still sitting in the now-hidden Author field.
        entry.author = (typeField.value === 'Videos') ? '' : authorField.value;
        entry.chapter = chapterField.value;
        entry.volume = volumeField.value;
        entry.page = pageField.value;
        entry.episode = episodeField.value;
        entry.status = statusField.value;
        entry.link = linkField.value;

        // editingTags already holds exactly the tags the user built up
        // via the chips above (adds/removes edited this array directly -
        // see renderTagChips/addTagFromInput). Assigning it here is what
        // finally commits those tag changes onto the real entry.
        entry.tags = editingTags;

        // Only keep a rating for Completed comics. If the status isn't
        // (or no longer is) Completed, reset rating to null so it
        // starts blank again the next time this comic is Completed. If
        // it is Completed but the rating field was left blank, that's
        // also null (not yet rated) rather than "0 stars".
        if (statusField.value === 'Completed') {
          entry.rating = ratingField.value === '' ? null : parseFloat(ratingField.value);
        } else {
          entry.rating = null;
        }

        // No card is being edited anymore.
        entryBeingEdited = null;

        // Save the updated entry to localStorage so the edit survives
        // a page refresh.
        saveToStorage();

        // Redraw the shelf. This re-runs the type-based folder filter
        // at the top of renderList() using the entry's new type, so if
        // the type just changed (e.g. Manhwa -> Videos), the card
        // automatically appears/disappears from the currently active
        // tab as needed. A status change alone (e.g. Reading ->
        // Completed) no longer moves the card between tabs - it just
        // updates the ribbon/star rating - since tabs filter by type,
        // not status.
        renderList();
      });
      listItem.appendChild(saveButton);
    } else {
      // --- Normal display mode ---

      // The status used to be its own text line. Now it's a small
      // ribbon badge sitting in the corner of the cover placeholder
      // instead - so it gets appended onto coverPlaceholder, not
      // listItem. The status name (lowercased) becomes part of the
      // class name, e.g. "status-reading", which is how style.css
      // knows which color to give each ribbon.
      const statusRibbon = document.createElement('div');
      statusRibbon.className = 'status-ribbon status-' + entry.status.toLowerCase();
      statusRibbon.textContent = entry.status;
      coverPlaceholder.appendChild(statusRibbon);

      // Clicking the cover box or the title opens this comic's detail
      // page (see the "Detail view" section above renderList() for
      // what showDetailView() does). Both get the same click handler -
      // whichever one was clicked, "entry" is the same object either way.
      coverPlaceholder.classList.add('detail-link-target');
      coverPlaceholder.addEventListener('click', function () {
        showDetailView(entry);
      });

      const titleElement = document.createElement('div');
      titleElement.className = 'entry-title detail-link-target';
      titleElement.textContent = entry.title;
      titleElement.addEventListener('click', function () {
        showDetailView(entry);
      });
      listItem.appendChild(titleElement);

      // Star rating row: only for Completed comics, and only once a
      // rating has actually been set (entry.rating is null otherwise).
      // buildStarsHTML() does the actual full/half/empty math per star.
      if (entry.status === 'Completed' && entry.rating !== null && entry.rating !== undefined) {
        const ratingRow = document.createElement('div');
        ratingRow.className = 'entry-rating';
        ratingRow.innerHTML = buildStarsHTML(entry.rating);
        listItem.appendChild(ratingRow);
      }

      // Progress and link used to be two separate rows. Now they share
      // one compact row: the progress as a short text label ("Ch. #",
      // "Vol. #, Pg. #", or "Ep. #" depending on entry.type - see
      // formatProgressText() in the "Type" section near the top of
      // this file), the link as an icon + "Link" text.
      const infoRow = document.createElement('div');
      infoRow.className = 'entry-info-row';

      // formatProgressText() returns '' when this entry's progress
      // field(s) are blank (e.g. a Videos entry with no episode number
      // typed in) - in that case we skip adding the label at all,
      // rather than showing an empty span.
      const progressText = formatProgressText(entry);
      if (progressText) {
        const chapterElement = document.createElement('span');
        chapterElement.className = 'entry-chapter';
        // Plain text label instead of an icon. textContent is safe to
        // use here (unlike innerHTML) because progressText is built
        // from text the user typed in - textContent always treats it
        // as plain text, never as HTML/code, no matter what was typed.
        chapterElement.textContent = progressText;
        infoRow.appendChild(chapterElement);
      }

      const linkElement = document.createElement('a');
      linkElement.className = 'entry-link';
      linkElement.href = entry.link;
      // "Link" here is a fixed word we typed ourselves (not user input),
      // so it's fine to include directly in the same HTML string as the icon.
      linkElement.innerHTML = ICON_LINK + ' Link';
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      // Clicking it pops open the Open/Copy popup instead of opening
      // in a new tab right away - see "Link popup" near the bottom of
      // this file for wireLinkPopup().
      wireLinkPopup(linkElement);
      infoRow.appendChild(linkElement);

      listItem.appendChild(infoRow);

      // Edit and delete used to be full text buttons stacked on their
      // own lines. Now they're small icon buttons sharing one row at
      // the bottom of the card - built by buildEntryActions() above,
      // the same function the Private-mode row uses too.
      listItem.appendChild(buildEntryActions(entry));
    }

    manhwaList.appendChild(listItem);
  });
}

// Wire up the "Add Tag" button and Enter-in-the-tag-box for the
// Add-comic form, same as the pair built inside each edit-mode card.
addTagButton.addEventListener('click', function () {
  addTagFromInput(tagInput, newComicTags, tagsPreview);
});

tagInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTagFromInput(tagInput, newComicTags, tagsPreview);
  }
});

// The Add-entry form's own set of the four progress fields, bundled
// into one object so it can be handed straight to
// updateProgressFieldsVisibility() (see the "Type" section above).
const addFormProgressFields = {
  chapterField: chapterInput,
  volumeField: volumeInput,
  pageField: pageInput,
  episodeField: episodeInput
};

// Whenever a different Type is picked, show only the progress field(s)
// that type actually uses and hide the rest.
typeInput.addEventListener('change', function () {
  updateProgressFieldsVisibility(typeInput.value, addFormProgressFields);
  updateAuthorFieldVisibility(typeInput.value, authorInput);
});

// Run this function whenever the button is clicked
addButton.addEventListener('click', function () {
  const title = titleInput.value;
  const type = typeInput.value;
  // Videos entries don't have an Author (the field is hidden for them
  // - see updateAuthorFieldVisibility() above), so we force it blank
  // here even if something was typed in before switching the Type
  // dropdown to Videos, rather than trusting whatever's still sitting
  // in the now-hidden input.
  const author = (type === 'Videos') ? '' : authorInput.value;
  const chapter = chapterInput.value;
  const volume = volumeInput.value;
  const page = pageInput.value;
  const episode = episodeInput.value;
  const link = linkInput.value;
  const status = statusInput.value;

  // Don't add empty entries
  if (title.trim() === '') {
    return;
  }

  // Store all pieces of info together as one entry. rating starts as
  // null ("not rated yet") no matter what status is picked here - even
  // if someone adds a comic straight in as Completed, they set its
  // rating later through Edit, same as any other comic.
  //
  // Every entry gets all four progress fields (chapter/volume/page/
  // episode) no matter which type was picked - only the field(s) that
  // match "type" were ever visible for typing into, so the other(s)
  // just come through as whatever they started as: ''. See the "Type"
  // section above for why every entry always having all four fields
  // (instead of only the ones that apply) keeps the rest of the code
  // simpler.
  //
  // newComicTags.slice() makes a *copy* of the tags built up so far,
  // rather than handing over newComicTags itself. This matters: right
  // after this entry is pushed, we reset newComicTags back to empty
  // below so the form is ready for the next comic - if the entry were
  // holding the exact same array (instead of a copy), emptying
  // newComicTags would also empty the tags we just saved on this
  // entry, since both names would be pointing at the one array.
  manhwaEntries.push({
    id: generateComicId(),
    title: title,
    type: type,
    author: author,
    chapter: chapter,
    volume: volume,
    page: page,
    episode: episode,
    link: link,
    status: status,
    rating: null,
    tags: newComicTags.slice(),
    notes: '',
    scenes: [],
    characters: [],
    hasImage: false
  });

  // Save the new full list to localStorage so the new entry survives
  // a page refresh.
  saveToStorage();

  // Redraw the list so the new entry shows up
  renderList();

  // Clear the inputs so they're ready for the next entry
  titleInput.value = '';
  typeInput.value = 'Manhwa';
  authorInput.value = '';
  chapterInput.value = '';
  volumeInput.value = '';
  pageInput.value = '';
  episodeInput.value = '';
  linkInput.value = '';
  statusInput.value = 'Reading';

  // Type just got reset to 'Manhwa' above, so put the progress fields
  // (and the Author field) back to the matching visibility (Chapter #
  // and Author shown, the rest hidden).
  updateProgressFieldsVisibility('Manhwa', addFormProgressFields);
  updateAuthorFieldVisibility('Manhwa', authorInput);

  // Empty the tags array back out and redraw the (now empty) chip
  // preview, so the next comic starts with a blank tag list too.
  newComicTags.length = 0;
  renderTagChips(tagsPreview, newComicTags);
});

// --- Bulk Add ---
// Lets you paste a whole list of titles at once instead of typing them
// into the Add-comic form one at a time. One status is picked for the
// whole paste and applied to every comic created from it.

// Turns the raw text pasted into the textarea into an array of clean
// title strings. This is the trickiest part conceptually, so here's
// the idea in plain English before the code:
//
//   1. Treat the whole pasted block as a stack of "chunks", where a
//      chunk is separated from the next one by a BLANK line (a line
//      with nothing on it). Each chunk is meant to become one comic.
//   2. Inside one chunk, there might be more than one line of text -
//      that happens when a long title got wrapped onto a second line
//      when it was copied. Since there's no blank line between those
//      two lines, they belong to the SAME comic, so we glue them back
//      together into one line, with a single space where the line
//      break used to be.
//   3. Clean up extra whitespace everywhere (leading/trailing spaces
//      on each line, and blank chunks caused by extra blank lines).
//
// Example input (the empty line between titles is the separator):
//   "Solo Leveling\n\nOmniscient Reader's\nViewpoint\n\n\nTower of God"
// becomes 3 titles:
//   ["Solo Leveling", "Omniscient Reader's Viewpoint", "Tower of God"]
function parseBulkTitles(rawText) {
  // Different systems sometimes use "\r\n" instead of just "\n" for a
  // line break (Windows text editors, some copy/paste sources). This
  // normalizes both to plain "\n" so the rest of this function only
  // has to deal with one kind of line break.
  const normalizedText = rawText.replace(/\r\n/g, '\n');

  // .split() cuts a string into an array everywhere it finds a match
  // for the pattern given to it. The pattern here, /\n\s*\n+/, means
  // "a line break, then zero-or-more whitespace-only characters, then
  // one-or-more more line breaks" - in plain terms: one blank line, OR
  // several blank lines in a row, all count as a single "chunk
  // separator". Everything between separators becomes one chunk in
  // the resulting array - that's how one blank line ends up meaning
  // "this comic is done, the next chunk is a new comic".
  const chunks = normalizedText.split(/\n\s*\n+/);

  const titles = [];

  chunks.forEach(function (chunk) {
    // Inside one chunk there may be one line (a simple, single-line
    // title) or several (a title that wrapped across lines). Splitting
    // on '\n' gives us each of those lines separately so we can clean
    // and rejoin them:
    //   .map(line => line.trim())   - strips stray spaces off each line
    //   .filter(line => line !== '') - drops any now-empty lines
    //   .join(' ')                  - glues the surviving lines back
    //                                  into ONE line, with a single
    //                                  space where each line break was
    const joinedTitle = chunk
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line !== ''; })
      .join(' ');

    // A chunk that was only blank lines/whitespace joins into ''  -
    // skip those instead of adding an empty title.
    if (joinedTitle !== '') {
      titles.push(joinedTitle);
    }
  });

  return titles;
}

// Show the panel, empty and ready, when "Bulk Add" is clicked.
bulkAddButton.addEventListener('click', function () {
  bulkAddPanel.style.display = 'flex';
  bulkAddTextarea.focus();
});

// "Cancel" hides the panel again and throws away whatever was pasted,
// without adding anything.
bulkAddCancelButton.addEventListener('click', function () {
  bulkAddTextarea.value = '';
  bulkAddPanel.style.display = 'none';
});

bulkAddSubmitButton.addEventListener('click', function () {
  const titles = parseBulkTitles(bulkAddTextarea.value);
  const chosenStatus = bulkAddStatusInput.value;

  if (titles.length === 0) {
    alert('Paste at least one title before clicking "Add All".');
    return;
  }

  // A Set is a list that automatically ignores repeat values and can
  // check "have I seen this before?" with .has(). We seed it with the
  // lowercased title of every comic already in the library, so
  // "Solo Leveling" and "solo leveling" count as the same title - the
  // duplicate check is meant to be case-insensitive.
  const existingTitlesLower = new Set(
    manhwaEntries.map(function (entry) { return entry.title.toLowerCase(); })
  );

  const addedTitles = [];
  const skippedTitles = [];

  titles.forEach(function (title) {
    const titleLower = title.toLowerCase();

    if (existingTitlesLower.has(titleLower)) {
      skippedTitles.push(title);
      return;
    }

    // New entry: same shape as a manually-added comic, just with
    // chapter/link left blank (nothing was typed for those here) and
    // an empty tags array. hasImage starts false the same as any new
    // comic - a cover photo can be added later from its detail page.
    // There's no Type dropdown in the Bulk Add panel, so every comic
    // added this way starts as type 'Manhwa' (its type can always be
    // changed afterward via Edit, same as any other entry).
    manhwaEntries.push({
      id: generateComicId(),
      title: title,
      type: 'Manhwa',
      chapter: '',
      volume: '',
      page: '',
      episode: '',
      link: '',
      status: chosenStatus,
      rating: null,
      tags: [],
      notes: '',
      scenes: [],
      characters: [],
      hasImage: false
    });

    addedTitles.push(title);

    // Remember this title too, so if it appears a SECOND time further
    // down in the same paste, that later copy gets skipped as a
    // duplicate instead of being added twice.
    existingTitlesLower.add(titleLower);
  });

  if (addedTitles.length > 0) {
    // Save and redraw once, after the whole batch is processed -
    // there's no need to save/redraw after every single title.
    saveToStorage();
    renderList();
  }

  // Build the one summary popup: always says how many were added, and
  // only mentions the skipped section at all if something was actually
  // skipped. "\n" inside a string typed by us (not user input) is a
  // real line break - alert() displays it as a new line, same as
  // pressing Enter would.
  let summaryMessage = 'Added ' + addedTitles.length +
    (addedTitles.length === 1 ? ' comic.' : ' comics.');

  if (skippedTitles.length > 0) {
    summaryMessage += '\n\nSkipped (already in your library):\n' +
      skippedTitles.join('\n');
  }

  alert(summaryMessage);

  // Reset the panel so it's empty and ready next time it's opened.
  bulkAddTextarea.value = '';
  bulkAddPanel.style.display = 'none';
});

// --- Quick Notes ---
// A Quick Note is a completely separate, much simpler kind of entry
// than a Manhwa/Other Comics/Videos comic: just a title and a block of
// freeform text - no status, no chapter/volume/page/episode, no cover
// image, no link, no tags. Despite being so much simpler, a Quick Note
// is still just one more object living inside the SAME manhwaEntries
// array as every comic (see "const manhwaEntries = []" near the top of
// this file) - it's given its own entry.type: 'Note', the same way a
// comic gets entry.type: 'Manhwa' (etc.) - rather than a second,
// separate array off on its own.
//
// That one shared array is really the whole trick behind "notes show up
// in All, but never in Manhwa/Other Comics/Videos, with no Notes tab of
// their own": look back at the "matchesFolder" check inside renderList()
// -
//   const matchesFolder = (currentFilter === 'All') || (entry.type === currentFilter);
// - "All" always lets every entry through no matter its type, so a note
// shows up there right alongside every comic. But none of the three
// type tabs' data-filter values ("Manhwa", "Other Comics", "Videos")
// ever equal "Note", so that same check quietly filters every note back
// out the moment you're on any tab OTHER than All - with no extra
// "is this a note?" check needed anywhere in that filtering logic. A
// Quick Note simply doesn't fit any of those three tabs, the same way a
// Manhwa never shows up under the Videos tab - it's the exact same
// mechanism already doing the work, not a special case bolted on for
// notes.
//
// A note's card (built inside renderList() below) is handled as its own
// early, separate branch though - reusing the comic-card code as-is
// would mean constantly checking "does this field even apply to a
// note?" (a note has no entry.status to build a ribbon out of, no
// entry.chapter to format, etc.) - simpler to keep the "this is a note"
// and "this is a comic" rendering code as two clearly separate paths.
// And unlike a comic, a note doesn't open a detail PAGE at all when its
// card is clicked - see the "Quick Note popup/modal" section further
// down this file for why it gets a small popup instead, and how that's
// built differently from showDetailView()/showLibraryView() above.

// Builds the short one-line preview shown on a note's card (never the
// full text - that's only shown once you open the note's own detail
// page). "(noteText || '').trim()" covers a brand new note that was
// saved with no text typed in at all. NOTE_SNIPPET_LENGTH characters is
// roughly one short line - long enough to recognize the note, short
// enough that the card stays exactly as compact as a comic card.
const NOTE_SNIPPET_LENGTH = 80;
function buildNoteSnippet(noteText) {
  const trimmedText = (noteText || '').trim();

  if (trimmedText === '') {
    return 'No content yet';
  }
  if (trimmedText.length <= NOTE_SNIPPET_LENGTH) {
    return trimmedText;
  }

  return trimmedText.slice(0, NOTE_SNIPPET_LENGTH).trim() + '...';
}

// --- Add Entry sheet (phone widths only) ---
// On laptop/tablet, .form (the Add Entry fields) just sits on the page
// like it always has - none of this code changes that. On phone widths,
// style.css turns #addEntrySheetOverlay into a dimmed backdrop and
// .form into a popup "bottom sheet" sitting on top of it (see the
// "Phone-width layout: Add-entry sheet" comment in style.css for the
// full explanation), and the "+" button below is what opens it.
//
// This works by adding/removing one CSS class ("sheet-open") - it never
// sets addEntrySheetOverlay.style.display directly the way the Quick
// Note modal does. That distinction matters here: a JS-set inline style
// would apply at EVERY screen width, but this feature must only ever do
// anything on phone widths. Toggling a class instead lets style.css's
// @media (max-width: 600px) rule stay in full control - on wider
// screens, no CSS rule even looks at "sheet-open", so adding/removing
// it has no effect at all.

// "+" button: opens the sheet.
openAddEntrySheetButton.addEventListener('click', function () {
  addEntrySheetOverlay.classList.add('sheet-open');
});

// "X" button inside the sheet: closes it again. Doesn't touch any of
// the typed-in field values - closing the sheet this way is exactly
// like collapsing the always-visible form back down would be, nothing
// gets cleared or saved.
addEntrySheetCloseButton.addEventListener('click', function () {
  addEntrySheetOverlay.classList.remove('sheet-open');
});

// Clicking the dimmed backdrop itself (anywhere OUTSIDE .form) also
// closes the sheet - same "event.target === the overlay itself" check
// used by the Quick Note modal below, so clicks inside the form fields
// don't accidentally close it.
addEntrySheetOverlay.addEventListener('click', function (event) {
  if (event.target === addEntrySheetOverlay) {
    addEntrySheetOverlay.classList.remove('sheet-open');
  }
});

// Pressing Escape closes the sheet too, but only while it's actually
// open.
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && addEntrySheetOverlay.classList.contains('sheet-open')) {
    addEntrySheetOverlay.classList.remove('sheet-open');
  }
});

// --- Quick Note popup/modal ---
// Everywhere else in this app, "opening" something (a comic's detail
// page) means hiding #libraryView and showing #detailView in its place
// - see showDetailView()/showLibraryView() above. That works great for
// a comic, which has a LOT to show (cover, status, tags, scenes,
// characters...), but it's overkill for a Quick Note, which is just two
// fields. So instead, a Quick Note opens in a MODAL: a small popup box
// (#quickNoteModal) that floats on top of the page inside a dimmed,
// full-screen backdrop (#quickNoteModalOverlay) - see the big comment
// above that div in index.html for exactly how "float on top" is done
// with plain CSS (position: fixed + z-index), and why that means
// whatever page was showing underneath (the shelf, or even a comic's
// own detail page) is still sitting there untouched the whole time.
// Opening/closing this modal NEVER touches #libraryView or #detailView
// at all - it's a layer that sits above both, not a third "page".
//
// null while the modal is being used to CREATE a brand new note.
// Holds that note's own entry object (the real one from manhwaEntries,
// not a copy - same pattern as currentDetailEntry above) while the
// modal is instead open to EDIT an existing one. Save/Delete below both
// check this variable to know which of the two jobs they're doing.
let editingQuickNoteEntry = null;

// Shows the popup. Pass an existing note's entry object to edit it
// (its title/text get loaded into the fields, and the Delete button
// appears); pass null (or nothing) to open the popup empty, ready to
// create a brand new note instead.
function openQuickNoteModal(entry) {
  editingQuickNoteEntry = entry || null;

  quickNoteModalTitleInput.value = entry ? entry.title : '';
  quickNoteModalTextInput.value = entry ? entry.noteText : '';

  // There's nothing to delete yet when creating a brand new note, so
  // the button is only shown once we're editing a note that already
  // exists.
  quickNoteModalDeleteButton.style.display = entry ? '' : 'none';

  quickNoteModalOverlay.style.display = 'flex';
  quickNoteModalTitleInput.focus();
}

// Hides the popup again without saving anything - used by the "X"
// button, clicking the dimmed backdrop, and pressing Escape below, plus
// after a successful Save/Delete. Clearing editingQuickNoteEntry isn't
// strictly required (openQuickNoteModal() always sets it fresh before
// the popup is shown again), but doing it here means there's no stray
// reference to an old note left sitting around while the popup is
// closed.
function closeQuickNoteModal() {
  quickNoteModalOverlay.style.display = 'none';
  editingQuickNoteEntry = null;
}

// "Quick Notes" button in the Add-entry row: opens the popup empty, for
// creating a brand new note.
quickNotesButton.addEventListener('click', function () {
  openQuickNoteModal(null);
});

// The "X" button inside the popup just closes it - same as Cancel ever
// did, nothing typed gets saved unless "Save Note" below was clicked.
quickNoteModalCloseButton.addEventListener('click', closeQuickNoteModal);

// Clicking the dimmed backdrop itself (anywhere OUTSIDE the small white
// box) also closes the popup - a common modal convention. The "event.
// target === quickNoteModalOverlay" check is what makes this only fire
// for the backdrop: a click that started inside #quickNoteModal (the
// title input, the textarea, a button) still counts as a click "on"
// the overlay because of how clicks bubble up through the page, but
// its event.target is whichever inner element was actually clicked,
// not the overlay itself - so clicking inside the box never accidentally
// closes it.
quickNoteModalOverlay.addEventListener('click', function (event) {
  if (event.target === quickNoteModalOverlay) {
    closeQuickNoteModal();
  }
});

// Pressing Escape closes the popup too, but only while it's actually
// open - without the display check, this would also fire (harmlessly,
// but pointlessly) on every Escape press anywhere else in the app.
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && quickNoteModalOverlay.style.display !== 'none') {
    closeQuickNoteModal();
  }
});

// "Save Note" button: does one of two different things depending on
// editingQuickNoteEntry, which is exactly what openQuickNoteModal() set
// a moment ago -
//   - null: this is a brand new note, so ADD a new entry to
//     manhwaEntries (the same shared array every comic lives in too -
//     see the big comment further up this section for why that's what
//     makes a note show up in the All tab for free, with no separate
//     "Notes" tab needed).
//   - an existing entry: UPDATE that entry's own title/noteText in
//     place instead of creating a second one.
// Either way, a title is the only required field - the text itself is
// allowed to be blank (e.g. a note you're planning to fill in later).
quickNoteModalSaveButton.addEventListener('click', function () {
  const title = quickNoteModalTitleInput.value.trim();

  if (title === '') {
    alert('Please enter a title before saving this note.');
    return;
  }

  if (editingQuickNoteEntry === null) {
    manhwaEntries.push({
      id: generateComicId(),
      title: title,
      type: 'Note',
      noteText: quickNoteModalTextInput.value
    });
  } else {
    editingQuickNoteEntry.title = title;
    editingQuickNoteEntry.noteText = quickNoteModalTextInput.value;
  }

  saveToStorage();
  renderList();
  closeQuickNoteModal();
});

// "Delete Note" button: only ever visible while editing an existing
// note (see openQuickNoteModal() above), so editingQuickNoteEntry is
// guaranteed to be a real entry here, never null. Removes it from
// manhwaEntries entirely (same .indexOf() + .splice() pattern
// buildEntryActions() uses to delete a whole comic). A confirm() prompt
// guards this since - unlike deleting a comic from the shelf, which is
// one click away either way - there's no separate "Edit" step here that
// could have warned you first; Delete is the very first button in this
// popup that changes anything.
quickNoteModalDeleteButton.addEventListener('click', function () {
  const confirmed = confirm('Delete this note? This cannot be undone.');
  if (!confirmed) {
    return;
  }

  const indexToRemove = manhwaEntries.indexOf(editingQuickNoteEntry);
  manhwaEntries.splice(indexToRemove, 1);
  saveToStorage();
  renderList();
  closeQuickNoteModal();
});

// Wire up each filter tab. forEach loops over the NodeList of
// buttons and gives each one its own click listener.
filterTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    // The button's data-filter attribute (e.g. data-filter="Videos")
    // tells us which type to filter by. tab.dataset.filter reads it.
    currentFilter = tab.dataset.filter;

    // Move the "active" highlight: strip it from every tab, then add
    // it back only to the one that was just clicked.
    filterTabs.forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');

    // "characters-tab-active" on <body> is what style.css's
    // "body.characters-tab-active .zoom-controls, .search-bar" rule
    // keys off of, to hide the Card Size slider AND the search bar
    // whenever this tab is the one selected (neither one applies to a
    // combined list of characters) - same idea as "private-mode"
    // further down this file hiding the zoom slider for Private mode.
    document.body.classList.toggle('characters-tab-active', currentFilter === 'Characters');

    // Close the status dropdown (if it happened to be open) and redraw
    // #statusFilterRow so it shows/hides itself correctly and reflects
    // THIS newly-active tab's own remembered status filter, not
    // whichever tab was active a moment ago - see the big comment
    // above typeStatusFilters for why every type tab keeps its own
    // separate filter instead of sharing one.
    closeStatusDropdown();
    updateStatusFilterRowUI();

    // Redraw the shelf using the new filter
    renderList();
  });
});

// Clicking "All" switches the active type tab's own filter state to
// 'All' (see typeStatusFilters above) - it only ever touches
// typeStatusFilters[currentFilter], so it can never affect any other
// type tab's own filter.
statusAllButton.addEventListener('click', function () {
  const filterState = typeStatusFilters[currentFilter];
  filterState.mode = 'All';

  updateStatusFilterRowUI();
  renderList();
});

// Clicking the dropdown button just toggles the menu open/closed - it
// doesn't change the filter itself. Picking one of the options inside
// the menu (built in buildStatusDropdownMenu() above) is what actually
// changes the filter.
statusDropdownButton.addEventListener('click', function () {
  const isCurrentlyOpen = statusDropdownMenu.style.display !== 'none';

  if (isCurrentlyOpen) {
    closeStatusDropdown();
  } else {
    statusDropdownMenu.style.display = 'flex';
    statusDropdownButton.setAttribute('aria-expanded', 'true');
  }
});

// Clicking anywhere outside the dropdown (its button or its menu)
// closes the menu if it's open - the standard "click elsewhere to
// dismiss" behavior expected of any dropdown. statusDropdown.contains()
// covers clicks on EITHER the button or the menu inside it, since both
// live inside that one wrapping div (see index.html).
document.addEventListener('click', function (event) {
  if (!statusDropdown.contains(event.target)) {
    closeStatusDropdown();
  }
});

buildStatusDropdownMenu();

// --- Search bar ---
// One text input filters the shelf live, combined with whichever
// folder tab is active (see the "matchesFolder"/"titleMatches"/
// "tagsMatch" checks inside renderList() above for the actual
// matching logic - this section is just wiring up the box itself).

// Fires on every keystroke (not just when you press Enter), which is
// what makes the shelf filter live as you type instead of waiting for
// a submit action.
searchInput.addEventListener('input', function () {
  // .trim() drops accidental leading/trailing spaces (so " isekai "
  // still matches), .toLowerCase() is what makes the search
  // case-insensitive - both sides of every comparison in renderList()
  // are lowercased, so "Isekai" typed here still matches a tag saved
  // as "isekai".
  currentSearchTerm = searchInput.value.trim().toLowerCase();

  // Only show the (x) clear button once there's actually something to
  // clear. 'flex' matches the display value .clear-search-button uses
  // once visible (see style.css) - it has to be a real value here,
  // not '', since '' would just fall back to the CSS default of "none".
  clearSearchButton.style.display = (currentSearchTerm === '') ? 'none' : 'flex';

  // Redraw the shelf so it reflects the new search term immediately.
  renderList();
});

// Clicking the (x) resets the box back to showing everything, without
// having to select-all-and-delete by hand.
clearSearchButton.addEventListener('click', function () {
  searchInput.value = '';
  currentSearchTerm = '';
  clearSearchButton.style.display = 'none';
  renderList();

  // Send focus back to the box so you can immediately start typing a
  // new search instead of having to click into it again.
  searchInput.focus();
});

// --- Privacy toggle ---
// One checkbox (styled as a slider switch in style.css) controls the
// whole shelf's display mode. Unchecked = Cover mode, checked =
// Private mode. On every change we: (1) update displayMode so
// renderList() knows which way to draw each entry, (2) add/remove
// the "private-mode" class on <body>, which is what the CSS rules for
// hiding the zoom controls and switching #manhwaList to a single
// column of rows key off of, and (3) redraw the shelf.
privacyToggleInput.addEventListener('change', function () {
  displayMode = privacyToggleInput.checked ? 'private' : 'cover';
  document.body.classList.toggle('private-mode', displayMode === 'private');
  renderList();
});

// --- Zoom controls ---
// The slider and the +/- buttons all do the exact same thing under the
// hood: change one CSS custom property, --card-scale, that lives on
// #manhwaList. Every card size in style.css (font sizes, padding, gaps,
// icon widths, the status ribbon, all of it) is written as
// "calc(<original size> * var(--card-scale))" instead of a plain
// number - so setting --card-scale to, say, 0.6 shrinks EVERY one of
// those sizes to 60% of normal, all at once, in the same proportion.
// That's the whole trick: nothing on the card is hidden, removed, or
// swapped for a simpler version at small sizes - it's the exact same
// card, just drawn smaller (or bigger).

// How far the slider (and the +/- buttons) are allowed to go, and how
// much one +/- click changes the zoom by. These match the min/max/step
// already set on the <input type="range"> in index.html.
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.8;
const ZOOM_STEP = 0.1;

// Applies a new zoom level: clamps it to the allowed range, writes it
// onto the --card-scale CSS variable (which is what actually resizes
// the cards, purely through CSS - no re-rendering needed), and keeps
// the slider position and the "100%" text in sync with it.
function setCardScale(scale) {
  const clampedScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, scale));

  manhwaList.style.setProperty('--card-scale', clampedScale);
  zoomSlider.value = clampedScale;
  zoomValueLabel.textContent = Math.round(clampedScale * 100) + '%';
}

// Dragging the slider fires "input" continuously as it moves (not just
// once when released), which is what makes the cards resize live.
zoomSlider.addEventListener('input', function () {
  setCardScale(parseFloat(zoomSlider.value));
});

zoomInButton.addEventListener('click', function () {
  setCardScale(parseFloat(zoomSlider.value) + ZOOM_STEP);
});

zoomOutButton.addEventListener('click', function () {
  setCardScale(parseFloat(zoomSlider.value) - ZOOM_STEP);
});

// Set the starting zoom to 100%, matching the slider's default value
// in the HTML.
setCardScale(1);

// --- Link popup ---
// Every link in the app (the compact card view, the Private list view,
// and the full URL on the detail page) used to be a plain <a href="...">
// that opened the moment you clicked it. Now clicking one of those
// links instead pops open #linkPopup (see index.html) right above it,
// with two buttons: "Open" (does what clicking used to do) and "Copy"
// (copies the link's URL to the clipboard).
//
// All three places share ONE small function, wireLinkPopup(), instead
// of each one having to build its own popup logic. That function
// doesn't need to be told the URL directly - it just reads it straight
// off the link's own href attribute at the moment you click, using
// linkElement.getAttribute('href'). That's the same string
// showDetailView(), buildPrivateRow(), etc. already put there, so
// there's nothing to keep in sync - wire the link once, and whatever
// URL it happens to be pointing at NOW is what the popup will use.

// Remembers which link the popup is currently open for, so the "Open"
// and "Copy" buttons (wired up once, below) know which URL to act on.
// '' means "the popup is closed" - see closeLinkPopup().
let linkPopupUrl = '';

// The Copy button briefly shows "Copied!" after a successful copy (see
// linkPopupCopyButton's click handler below), then changes back. This
// remembers that pending "change it back" timer so a second Copy click
// (or the popup closing) can cancel a leftover one instead of two
// timers stepping on each other.
let linkPopupCopyResetTimeout = null;

// Moves #linkPopup above linkElement and shows it, remembering url as
// the one "Open"/"Copy" should act on. getBoundingClientRect() gives
// linkElement's position relative to the browser window itself (NOT
// the page - it already accounts for scrolling), which lines up with
// "position: fixed" on .link-popup in style.css - that's why fixed
// (not absolute) positioning was chosen for this popup. We only need
// its top-left corner: the CSS's transform: translateY(...) is what
// actually shifts the box upward so it appears ABOVE that corner
// instead of below it, without us needing to know the popup's own
// height ahead of time.
function openLinkPopupFor(linkElement, url) {
  const linkRect = linkElement.getBoundingClientRect();
  linkPopup.style.left = linkRect.left + 'px';
  linkPopup.style.top = linkRect.top + 'px';

  linkPopupUrl = url;

  // In case a previous popup was closed mid "Copied!" flash, make sure
  // the button always starts fresh as plain "Copy" text.
  clearTimeout(linkPopupCopyResetTimeout);
  linkPopupCopyButton.textContent = 'Copy';

  linkPopup.style.display = 'flex';
}

// Hides the popup and forgets which link it was for. Shared by: the
// "Open" button (once it's done its job), the "Copy" button (once the
// "Copied!" flash finishes), and the document-wide click listener
// below that closes it when you click anywhere else on the page.
function closeLinkPopup() {
  linkPopup.style.display = 'none';
  linkPopupUrl = '';
  clearTimeout(linkPopupCopyResetTimeout);
}

// Wires up ONE link element so clicking it opens the popup above it
// instead of navigating straight away. Called once for every link the
// popup should apply to - see buildPrivateRow(), the card-view link in
// renderList(), and the one-time call for #detailLink near the bottom
// of this section.
function wireLinkPopup(linkElement) {
  linkElement.addEventListener('click', function (event) {
    // Stops the browser from following the link immediately...
    event.preventDefault();
    // ...and stops this same click from also reaching the document
    // click listener below (the one that closes the popup when you
    // click "anywhere else"). Without this, that listener would see
    // this very click and instantly close the popup we're about to
    // open, since the link itself isn't inside #linkPopup.
    event.stopPropagation();

    // A link with nothing typed in has no href attribute at all (see
    // showDetailView()'s "No link added" case) - nothing to open or
    // copy, so do nothing rather than popping up an empty box.
    const url = linkElement.getAttribute('href');
    if (!url) {
      return;
    }

    openLinkPopupFor(linkElement, url);
  });
}

// "Open": exactly what clicking the link used to do - open the URL in
// a new tab. window.open()'s third argument ('noopener,noreferrer') is
// the same protection every link in this app already had via its
// rel="noopener noreferrer" attribute: it stops that new tab from
// getting a JavaScript handle back to this page.
linkPopupOpenButton.addEventListener('click', function () {
  if (linkPopupUrl) {
    window.open(linkPopupUrl, '_blank', 'noopener,noreferrer');
  }
  closeLinkPopup();
});

// "Copy": writes the link's URL onto the system clipboard using the
// Clipboard API (navigator.clipboard.writeText). This is the modern,
// built-in way browsers let a page copy text FOR you, without needing
// any hidden textarea + document.execCommand('copy') trick like older
// code often uses. It's asynchronous (it returns a Promise) because
// the browser may need to ask the user for clipboard permission first
// - so the "Copied!" text only appears inside .then(), once the copy
// has actually finished successfully, never before.
linkPopupCopyButton.addEventListener('click', function () {
  if (!linkPopupUrl) {
    return;
  }

  navigator.clipboard.writeText(linkPopupUrl).then(function () {
    linkPopupCopyButton.textContent = 'Copied!';

    // Give the person a moment to see the "Copied!" confirmation, then
    // close the popup automatically - same as if they'd clicked
    // "Open". clearTimeout() first (also done in openLinkPopupFor())
    // guards against two overlapping timers if Copy is somehow clicked
    // twice in a row.
    clearTimeout(linkPopupCopyResetTimeout);
    linkPopupCopyResetTimeout = setTimeout(function () {
      closeLinkPopup();
    }, 1200);
  });
  // No .catch() fallback here: navigator.clipboard.writeText() only
  // fails in situations this app doesn't run in (very old browsers, or
  // a page loaded over plain http:// instead of https:///localhost) -
  // this app is a PWA (see manifest.json), always served securely.
});

// Closes the popup on a click ANYWHERE else on the page - the same
// "click outside to dismiss" pattern the status dropdown menu uses
// further up this file (see the document click listener right after
// buildStatusDropdownMenu()). linkPopup.contains(event.target) is true
// for clicks on the popup itself (its Open/Copy buttons), which is
// exactly what we want to NOT close for - those have their own click
// handlers above that close the popup once they're done.
document.addEventListener('click', function (event) {
  if (!linkPopup.contains(event.target)) {
    closeLinkPopup();
  }
});

// #detailLink (unlike the card-view and Private-row links above) is
// one fixed element that already exists in index.html - showDetailView()
// just changes its href/text each time a different comic is opened,
// it never gets recreated. So it only needs to be wired up ONCE, here,
// rather than every time a card is built.
wireLinkPopup(detailLink);

// --- Page load ---
// Check localStorage for comics saved from a previous visit. If any
// are found, loadFromStorage() fills manhwaEntries with them before
// we draw anything, so renderList() here shows every loaded comic
// under the "All" tab (a full page reload always resets the tabs
// back to "All", same as it always did before). Because
// manhwaEntries is now correctly filled in from localStorage before
// any clicks happen, clicking over to "Manhwa" (or any other tab)
// right after a reload filters that same loaded data correctly too.
loadFromStorage();
updateStatusFilterRowUI();
renderList();
