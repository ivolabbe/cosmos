/**
 * COSMOS Review — Client-side app
 *
 * Reads ?reviewer= from URL, fetches assignments from Apps Script,
 * loads articles in iframe, submits verdicts.
 */

// ── Configuration ──────────────────────────────────────────────
// Replace with your deployed Apps Script web app URL
const API_URL = 'https://script.google.com/macros/s/AKfycbyehyBr6Dm3323QV2eFu2BWB6t7rKl2iZbitZpWViHY2UzReFSAijh-aYIJyRg13KE/exec';

// Base path to article HTML files (relative to review page)
const ARTICLE_BASE = '../articles/';

// ── State ──────────────────────────────────────────────────────
let assignments = [];
let currentIndex = -1;
let selectedVerdict = null;
let reviewerEmail = '';
let stats = { approved: 0, correction: 0, skip: 0 };

// ── Init ───────────────────────────────────────────────────────

async function init() {
  const params = new URLSearchParams(window.location.search);
  reviewerEmail = params.get('reviewer');

  if (!reviewerEmail) {
    showError('No reviewer specified. Use ?reviewer=your@email.com');
    return;
  }

  if (!API_URL) {
    showError('API_URL not configured. Set it in review/app.js');
    return;
  }

  try {
    const res = await fetch(API_URL + '?action=assignments&reviewer=' + encodeURIComponent(reviewerEmail));
    if (!res.ok) throw new Error('HTTP ' + res.status);
    assignments = await res.json();
  } catch (err) {
    showError('Failed to load assignments: ' + err.message);
    return;
  }

  if (!assignments.length) {
    showDone('No articles assigned to ' + reviewerEmail);
    return;
  }

  // Find first pending assignment
  loadNextPending();
}

// ── Navigation ─────────────────────────────────────────────────

function loadNextPending() {
  // Find next pending from current position
  for (let i = currentIndex + 1; i < assignments.length; i++) {
    if (assignments[i].status === 'pending') {
      currentIndex = i;
      loadArticle(assignments[i]);
      return;
    }
  }

  // No more pending — show done screen
  showDone();
}

function loadArticle(assignment) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
  document.getElementById('doneScreen').style.display = 'none';

  // Update article iframe
  document.getElementById('articleFrame').src = ARTICLE_BASE + assignment.slug + '.html';

  // Update panel
  document.getElementById('currentSlug').textContent = assignment.slug;
  document.getElementById('currentInfo').textContent = 'Assigned: ' + assignment.assigned_date;

  // Reset verdict state
  selectedVerdict = null;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('correctionField').classList.remove('visible');
  document.getElementById('correctionText').value = '';
  document.getElementById('errorMsg').style.display = 'none';

  // Reset button states
  document.querySelectorAll('.review-btn').forEach(function(btn) {
    btn.classList.remove('review-btn--active');
  });

  // Update progress
  updateProgress();
}

// ── Verdict selection ──────────────────────────────────────────

function selectVerdict(btn) {
  // Remove active from all buttons
  document.querySelectorAll('.review-btn').forEach(function(b) {
    b.classList.remove('review-btn--active');
  });

  // Activate clicked button
  btn.classList.add('review-btn--active');
  selectedVerdict = btn.dataset.verdict;

  // Show/hide correction field
  var corrField = document.getElementById('correctionField');
  if (selectedVerdict === 'correction') {
    corrField.classList.add('visible');
  } else {
    corrField.classList.remove('visible');
  }

  // Enable submit
  document.getElementById('submitBtn').disabled = false;
}

// ── Submit ─────────────────────────────────────────────────────

async function submitReview() {
  if (!selectedVerdict) return;

  var comments = '';
  if (selectedVerdict === 'correction') {
    comments = document.getElementById('correctionText').value.trim();
    if (!comments) {
      showInlineError('Please describe what needs correcting.');
      return;
    }
  }

  var submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    var res = await fetch(API_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'review',
        reviewer: reviewerEmail,
        slug: assignments[currentIndex].slug,
        verdict: selectedVerdict,
        comments: comments
      })
    });

    var result = await res.json();
    if (result.error) throw new Error(result.error);

    // Update local state
    assignments[currentIndex].status = selectedVerdict === 'approved' ? 'approved'
      : selectedVerdict === 'correction' ? 'revision' : 'skipped';

    stats[selectedVerdict]++;

    // Load next
    submitBtn.textContent = 'Submit & Next';
    loadNextPending();

  } catch (err) {
    showInlineError('Submit failed: ' + err.message + '. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit & Next';
  }
}

// ── UI helpers ─────────────────────────────────────────────────

function updateProgress() {
  var total = assignments.length;
  var reviewed = assignments.filter(function(a) { return a.status !== 'pending'; }).length;
  var pending = total - reviewed;
  document.getElementById('progress').textContent =
    reviewed + ' of ' + total + ' reviewed' + (pending > 0 ? ' · ' + pending + ' remaining' : '');
}

function showError(msg) {
  document.getElementById('loading').textContent = msg;
  document.getElementById('loading').style.color = '#c62828';
}

function showInlineError(msg) {
  var el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
}

function showDone(customMsg) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('main').style.display = 'none';
  document.getElementById('doneScreen').style.display = 'flex';

  var summary = '';
  if (stats.approved || stats.correction || stats.skip) {
    var parts = [];
    if (stats.approved) parts.push(stats.approved + ' approved');
    if (stats.correction) parts.push(stats.correction + ' with corrections');
    if (stats.skip) parts.push(stats.skip + ' skipped');
    summary = 'This session: ' + parts.join(', ') + '.';
  }

  if (customMsg) {
    document.getElementById('doneScreen').querySelector('p').textContent = customMsg;
  }
  document.getElementById('doneSummary').textContent = summary;
}

// ── Start ──────────────────────────────────────────────────────
init();
