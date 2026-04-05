/**
 * Google Sheets certification logger
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets and create a new spreadsheet.
 * 2. Go to Extensions → Apps Script and paste the following script:
 *
 *    function doGet(e) {
 *      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      sheet.appendRow([
 *        new Date(),
 *        e.parameter.codename  || '',
 *        Number(e.parameter.xp || 0),
 *        e.parameter.rank      || '',
 *        e.parameter.certId    || '',
 *        e.parameter.date      || '',
 *      ]);
 *      return ContentService
 *        .createTextOutput(JSON.stringify({ success: true }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 3. Click Deploy → New deployment → Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL.
 * 5. Create a .env file in the project root and add:
 *    VITE_GOOGLE_SHEETS_URL=<your web app URL>
 * 6. Restart the dev server.
 */

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

/**
 * Log a certification event to Google Sheets.
 * Uses no-cors GET so no CORS preflight is needed.
 * The response is opaque but the row is still written server-side.
 *
 * @param {{ codename: string, xp: number, rank: string, certId: string, date: string }} data
 */
export async function logCertification({ codename, xp, rank, certId, date }) {
    if (!SHEETS_URL) {
        console.warn('[Sheets] VITE_GOOGLE_SHEETS_URL is not set — skipping log.');
        return;
    }
    const params = new URLSearchParams({ codename, xp: String(xp), rank, certId, date });
    try {
        await fetch(`${SHEETS_URL}?${params.toString()}`, { mode: 'no-cors' });
    } catch (err) {
        console.error('[Sheets] Failed to log certification:', err);
    }
}
