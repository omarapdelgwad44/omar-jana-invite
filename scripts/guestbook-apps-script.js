/**
 * Guestbook backend for the Omar & Jana invitation.
 *
 * Setup (about two minutes) if not already deployed via clasp:
 * 1. Create a Google Sheet, e.g. "تهاني عمر وجنى".
 * 2. Extensions → Apps Script, replace Code.gs with this file.
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL into lib/guestbook-config.ts
 * 5. Rebuild and publish the invitation.
 *
 * Standalone deploys (no bound sheet) create a Google Sheet automatically
 * and remember its id in Script Properties.
 */

const SHEET_NAME = "wishes";
const NAME_MAX = 60;
const MESSAGE_MAX = 500;
const PROP_SHEET_ID = "SHEET_ID";

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getSpreadsheet_() {
  try {
    const active = SpreadsheetApp.getActive();
    if (active) return active;
  } catch (error) {
    // Standalone web app — fall through to Script Properties.
  }

  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(PROP_SHEET_ID);
  if (existingId) {
    return SpreadsheetApp.openById(existingId);
  }

  const created = SpreadsheetApp.create("تهاني عمر وجنى");
  props.setProperty(PROP_SHEET_ID, created.getId());
  return created;
}

function getSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "name", "message", "createdAt"]);
  }
  return sheet;
}

function readWishes_(sheet) {
  const rows = sheet.getDataRange().getValues();
  const wishes = [];
  for (let index = rows.length - 1; index >= 1; index -= 1) {
    const [id, name, message, createdAt] = rows[index];
    const trimmedName = String(name || "").trim();
    const trimmedMessage = String(message || "").trim();
    if (!trimmedName || !trimmedMessage) continue;
    wishes.push({
      id: String(id || index),
      name: trimmedName,
      message: trimmedMessage,
      createdAt: Number(createdAt) || 0,
    });
  }
  return wishes;
}

function addWish_(name, message) {
  const trimmedName = String(name || "")
    .trim()
    .slice(0, NAME_MAX);
  const trimmedMessage = String(message || "")
    .trim()
    .slice(0, MESSAGE_MAX);
  if (!trimmedName || !trimmedMessage) {
    return { error: "empty" };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(8000);
  try {
    const sheet = getSheet_();
    const wish = {
      id: Utilities.getUuid(),
      name: trimmedName,
      message: trimmedMessage,
      createdAt: Date.now(),
    };
    sheet.appendRow([wish.id, wish.name, wish.message, wish.createdAt]);
    return { wish, wishes: readWishes_(sheet) };
  } finally {
    lock.releaseLock();
  }
}

function parseBody_(event) {
  if (event.parameter && (event.parameter.name || event.parameter.message)) {
    return {
      name: event.parameter.name,
      message: event.parameter.message,
    };
  }
  if (!event.postData || !event.postData.contents) return {};
  try {
    return JSON.parse(event.postData.contents);
  } catch (error) {
    return {};
  }
}

function doGet(event) {
  const body = parseBody_(event);
  if (body.name || body.message) {
    return json_(addWish_(body.name, body.message));
  }
  return json_({ wishes: readWishes_(getSheet_()) });
}

function doPost(event) {
  const body = parseBody_(event);
  return json_(addWish_(body.name, body.message));
}
