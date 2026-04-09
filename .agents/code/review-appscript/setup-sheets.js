/**
 * Run this function once from Apps Script editor to set up the sheet tabs.
 * It creates the "assignments" and "responses" tabs with headers.
 */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Rename Sheet1 to "assignments" if it exists
  var sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1) {
    sheet1.setName('assignments');
  }

  // Create or get assignments tab
  var assignments = ss.getSheetByName('assignments');
  if (!assignments) {
    assignments = ss.insertSheet('assignments');
  }
  assignments.getRange('A1:E1').setValues([['reviewer_email', 'reviewer_name', 'slug', 'assigned_date', 'status']]);
  assignments.getRange('A1:E1').setFontWeight('bold');
  assignments.setFrozenRows(1);

  // Create or get responses tab
  var responses = ss.getSheetByName('responses');
  if (!responses) {
    responses = ss.insertSheet('responses');
  }
  responses.getRange('A1:E1').setValues([['reviewer_email', 'slug', 'verdict', 'comments', 'timestamp']]);
  responses.getRange('A1:E1').setFontWeight('bold');
  responses.setFrozenRows(1);

  Logger.log('Setup complete: assignments + responses tabs created with headers');
}
