/**
 * COSMOS Review — Google Apps Script Web App
 *
 * Deploy as: Web App → Execute as: Me → Access: Anyone
 *
 * Setup:
 *   1. Create a Google Sheet named "COSMOS Review Assignments"
 *   2. Create two tabs: "assignments" and "responses"
 *   3. In "assignments" tab, add headers (row 1):
 *      reviewer_email | reviewer_name | slug | assigned_date | status
 *   4. In "responses" tab, add headers (row 1):
 *      reviewer_email | slug | verdict | comments | timestamp
 *   5. Open Extensions → Apps Script, paste this file
 *   6. Deploy → New Deployment → Web App
 *   7. Copy the deployment URL — that's your API_URL
 *
 * Endpoints:
 *   GET  ?action=assignments&reviewer=email   → JSON array of assignments
 *   POST {action: "review",   reviewer, slug, verdict, comments}
 *   POST {action: "assign",   reviewer_email, reviewer_name, slugs: [...]}
 *   POST {action: "notify",   reviewer_email, reviewer_name, slugs: [...]}
 *   POST {action: "reset",    slugs: [...]}
 *   GET  ?action=export                       → JSON of all assignments (for sync)
 */

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function getSheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

// --- GET handler ---

function doGet(e) {
  const action = e.parameter.action || 'assignments';

  if (action === 'assignments') {
    return handleGetAssignments(e.parameter.reviewer);
  }
  if (action === 'export') {
    return handleExport();
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
}

// --- POST handler ---

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;

  if (action === 'review') {
    return handleReview(data);
  }
  if (action === 'assign') {
    return handleAssign(data);
  }
  if (action === 'notify') {
    return handleNotify(data);
  }
  if (action === 'reset') {
    return handleReset(data);
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
}

// --- Handlers ---

function handleGetAssignments(reviewerEmail) {
  if (!reviewerEmail) {
    return jsonResponse({ error: 'reviewer parameter required' }, 400);
  }

  const sheet = getSheet('assignments');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const assignments = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0].toString().toLowerCase() === reviewerEmail.toLowerCase()) {
      assignments.push({
        reviewer_email: row[0],
        reviewer_name: row[1],
        slug: row[2],
        assigned_date: row[3],
        status: row[4]
      });
    }
  }

  return jsonResponse(assignments);
}

function handleReview(data) {
  const { reviewer, slug, verdict, comments } = data;
  if (!reviewer || !slug || !verdict) {
    return jsonResponse({ error: 'reviewer, slug, and verdict required' }, 400);
  }

  // Write to responses tab
  const responses = getSheet('responses');
  responses.appendRow([
    reviewer,
    slug,
    verdict,
    comments || '',
    new Date().toISOString()
  ]);

  // Update assignment status
  const assignments = getSheet('assignments');
  const assignData = assignments.getDataRange().getValues();
  for (let i = 1; i < assignData.length; i++) {
    if (assignData[i][0].toString().toLowerCase() === reviewer.toLowerCase()
        && assignData[i][2] === slug) {
      // Map verdict to status
      const statusMap = {
        'approved': 'approved',
        'correction': 'revision',
        'skip': 'skipped'
      };
      assignments.getRange(i + 1, 5).setValue(statusMap[verdict] || verdict);
      break;
    }
  }

  return jsonResponse({ ok: true, slug: slug, verdict: verdict });
}

function handleAssign(data) {
  const { reviewer_email, reviewer_name, slugs } = data;
  if (!reviewer_email || !slugs || !slugs.length) {
    return jsonResponse({ error: 'reviewer_email and slugs[] required' }, 400);
  }

  const sheet = getSheet('assignments');
  const today = new Date().toISOString().split('T')[0];

  // Check for existing assignments to avoid duplicates
  const existing = sheet.getDataRange().getValues();
  const existingSlugs = new Set();
  for (let i = 1; i < existing.length; i++) {
    if (existing[i][0].toString().toLowerCase() === reviewer_email.toLowerCase()) {
      existingSlugs.add(existing[i][2]);
    }
  }

  let added = 0;
  for (const slug of slugs) {
    if (!existingSlugs.has(slug)) {
      sheet.appendRow([reviewer_email, reviewer_name || '', slug, today, 'pending']);
      added++;
    }
  }

  return jsonResponse({ ok: true, added: added, skipped: slugs.length - added });
}

function handleNotify(data) {
  const { reviewer_email, reviewer_name, slugs } = data;
  if (!reviewer_email || !slugs || !slugs.length) {
    return jsonResponse({ error: 'reviewer_email and slugs[] required' }, 400);
  }

  const baseUrl = 'https://ivolabbe.github.io/cosmos/review/';
  const reviewUrl = baseUrl + '?reviewer=' + encodeURIComponent(reviewer_email);

  const articleList = slugs.map(s => '  • ' + s).join('\n');

  const subject = 'COSMOS Review — ' + slugs.length + ' article' + (slugs.length > 1 ? 's' : '') + ' ready for review';
  const body = 'Hi ' + (reviewer_name || 'there') + ',\n\n'
    + slugs.length + ' COSMOS encyclopedia article' + (slugs.length > 1 ? 's are' : ' is') + ' ready for your review:\n\n'
    + articleList + '\n\n'
    + 'Review here:\n' + reviewUrl + '\n\n'
    + 'You can review as many or as few as you like in one session.\n'
    + 'Click Approve, suggest Corrections, or Skip for each article.\n\n'
    + 'Thank you!\n'
    + 'COSMOS Encyclopedia Pipeline';

  MailApp.sendEmail({
    to: reviewer_email,
    subject: subject,
    body: body
  });

  return jsonResponse({ ok: true, emailed: reviewer_email, articles: slugs.length });
}

function handleReset(data) {
  const { slugs } = data;
  if (!slugs || !slugs.length) {
    return jsonResponse({ error: 'slugs[] required' }, 400);
  }

  const slugSet = new Set(slugs);

  // Remove matching rows from assignments (iterate backwards to avoid index shift)
  const assignments = getSheet('assignments');
  const aData = assignments.getDataRange().getValues();
  for (let i = aData.length - 1; i >= 1; i--) {
    if (slugSet.has(aData[i][2])) {
      assignments.deleteRow(i + 1);
    }
  }

  // Remove matching rows from responses
  const responses = getSheet('responses');
  const rData = responses.getDataRange().getValues();
  for (let i = rData.length - 1; i >= 1; i--) {
    if (slugSet.has(rData[i][1])) {
      responses.deleteRow(i + 1);
    }
  }

  return jsonResponse({ ok: true, reset: slugs });
}

function handleExport() {
  const sheet = getSheet('assignments');
  const data = sheet.getDataRange().getValues();
  const assignments = [];

  for (let i = 1; i < data.length; i++) {
    assignments.push({
      reviewer_email: data[i][0],
      reviewer_name: data[i][1],
      slug: data[i][2],
      assigned_date: data[i][3],
      status: data[i][4]
    });
  }

  return jsonResponse(assignments);
}

// --- Utility ---

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
