/**
 * Paste the Google Apps Script web app URL here after deploying
 * scripts/guestbook-apps-script.js (Execute as: Me, Who has access: Anyone).
 * The URL is not a secret — it only accepts name + message.
 *
 * If clasp already created "Omar Jana Guestbook", open:
 * https://script.google.com/home/projects/1XkMNsuc07fg_AI5rzWFRq3e2VMcHzsmcrbABQpp9BWSTJdN4DVEeyoUC/edit
 * Deploy → Manage deployments → edit Web app → Who has access: Anyone → Authorize.
 * Then paste the /exec URL below (example shape):
 * https://script.google.com/macros/s/AKfycbxt-e4gkSpozEMw1VEHSasawvWvUY0n5HrtEBCW8hxCr7Bosuq63dSSy_DJbECDh0u7/exec
 */
export const GUESTBOOK_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GUESTBOOK_URL?.trim() || "";

export const NAME_MAX = 60;
export const MESSAGE_MAX = 500;
