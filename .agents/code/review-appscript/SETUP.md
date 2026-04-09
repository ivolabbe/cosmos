# COSMOS Review — Apps Script Setup Reference

How the Google Sheets + Apps Script review backend was set up, and how to recreate it on a different Google account.

---

## Current deployment

| Resource | URL / ID |
|----------|----------|
| Google Sheet | [COSMOS Review Assignments](https://drive.google.com/open?id=1FoI7kxCEXveiCOlz8olfF9E4WshTAcphJ_3zRhNjWB8) |
| Apps Script project | [Script editor](https://script.google.com/d/1fTgEuLAUiI55KqHRxMLsm42Kgs7YnOiIdJM4B7ebl64VnVOfuBsITOL8/edit) |
| Web app URL | `https://script.google.com/macros/s/AKfycbyehyBr6Dm3323QV2eFu2BWB6t7rKl2iZbitZpWViHY2UzReFSAijh-aYIJyRg13KE/exec` |
| Google account | ivolabbe@gmail.com |

---

## How it was created (2026-04-09)

### 1. Prerequisites

- Node.js installed
- `clasp` (Google Apps Script CLI) installed: `npm install -g @google/clasp`
- Apps Script API enabled at https://script.google.com/home/usersettings

### 2. Login and create project

```bash
clasp login                     # opens browser for Google OAuth
clasp create --type sheets --title "COSMOS Review Assignments"
```

This creates both the Google Sheet and a bound Apps Script project. Clasp outputs:
- The Google Sheet URL
- The Apps Script project URL
- A `.clasp.json` file with the script ID

### 3. Push code

The Apps Script source lives in `.agents/code/review-appscript/`:
- `Code.js` — all endpoint handlers (doGet, doPost, assign, review, notify, reset, setup, export)
- `appsscript.json` — manifest (timezone, webapp config)
- `setup-sheets.js` — one-time function to create sheet tabs with headers

```bash
cd .agents/code/review-appscript
clasp push --force
```

### 4. Deploy as web app

The initial deployment must set access to "Anyone" which requires the Apps Script editor UI:

1. Open the Apps Script editor (clasp outputs the URL, or find it at https://script.google.com)
2. Click **Deploy** > **New deployment**
3. Click the gear icon next to "Select type" > choose **Web app**
4. Set "Execute as" > **Me** (the script runs as the sheet owner, so it can read/write the sheet and send email from this account)
5. Set "Who has access" > **Anyone** (so reviewers can submit without a Google login)
6. Click **Deploy**
7. **Authorize** when prompted — the script needs access to:
   - Google Sheets (read/write assignments and responses)
   - Gmail (send review notification emails from this account)
8. Copy the **Web app URL** — this is the API endpoint used by the review UI and local scripts

**Important:** The web app URL is permanent for this deployment. Subsequent code updates use `clasp push` + deployment version update (see "How to update" below) — the URL does not change.

### 5. Set up sheet tabs

After the web app is deployed, call the setup endpoint to create the sheet tabs:

```bash
curl -sL "https://script.google.com/macros/s/{DEPLOY_ID}/exec?action=setup"
```

This creates two tabs in the Google Sheet:
- **assignments**: `reviewer_email | reviewer_name | slug | assigned_date | status`
- **responses**: `reviewer_email | slug | verdict | comments | timestamp`

### 6. Configure the URL locally

Save the web app URL in `dev/review/config.json`:
```json
{
  "api_url": "https://script.google.com/macros/s/{DEPLOY_ID}/exec"
}
```

Also set it in `review/app.js` (the `API_URL` constant at the top).

### 7. Enable GitHub Pages deployment from dev-agent

The GitHub Pages environment protection rules must allow `dev-agent`:

```bash
gh api repos/ivolabbe/cosmos/environments/github-pages/deployment-branch-policies \
  --method POST -f name="dev-agent"
```

---

## How to update the Apps Script code

```bash
cd .agents/code/review-appscript
# edit Code.js
clasp push --force
```

After pushing, you must update the deployment to use the new version:

1. Open the [script editor](https://script.google.com/d/1fTgEuLAUiI55KqHRxMLsm42Kgs7YnOiIdJM4B7ebl64VnVOfuBsITOL8/edit)
2. Click **Deploy** > **Manage deployments**
3. Click the pencil icon on the active deployment
4. Change "Version" to the latest version number
5. Click **Deploy**

The web app URL does not change when you update the deployment version.

---

## How to recreate on a new Google account

Complete walkthrough for setting up the review backend from scratch on any Google account:

```bash
# 1. Install clasp if not already present
npm install -g @google/clasp

# 2. Enable the Apps Script API
#    Go to https://script.google.com/home/usersettings and toggle ON

# 3. Login with the new Google account
clasp login    # opens browser for OAuth

# 4. Create the project (creates both the Google Sheet and bound Apps Script)
cd .agents/code/review-appscript
rm -f .clasp.json               # remove old project reference
clasp create --type sheets --title "COSMOS Review Assignments"

# 5. Push the code
clasp push --force

# 6. Deploy from the Apps Script editor (see step 4 in "How it was created")
#    Execute as: Me, Who has access: Anyone
#    Authorize Sheets + Gmail permissions when prompted
#    Copy the Web app URL

# 7. Set up the sheet tabs
curl -sL "https://script.google.com/macros/s/{DEPLOY_ID}/exec?action=setup"
#    Should return: {"ok":true,"message":"Setup complete: ..."}

# 8. Configure the URL in the repo
#    Edit dev/review/config.json: set api_url to the Web app URL
#    Edit review/app.js: set API_URL to the Web app URL

# 9. If the GitHub repo changed, allow the dev branch to deploy to GitHub Pages
gh api repos/{owner}/{repo}/environments/github-pages/deployment-branch-policies \
  --method POST -f name="dev-agent"

# 10. Verify
curl -sL "https://script.google.com/macros/s/{DEPLOY_ID}/exec?action=export"
#    Should return: []
```

**Permissions the script needs:** Google Sheets (read/write the bound spreadsheet) and Gmail (send notification emails from the account). These are requested during the authorization step (#6).

---

## API reference

| Endpoint | Method | Parameters | What it does |
|----------|--------|------------|-------------|
| `?action=assignments&reviewer=email` | GET | reviewer email | Returns JSON array of assignments for that reviewer |
| `?action=export` | GET | none | Returns all assignments (for sync script) |
| `?action=setup` | GET | none | Creates/resets sheet tabs with headers |
| POST `{action: "review", reviewer, slug, verdict, comments}` | POST | | Records a review verdict, updates assignment status |
| POST `{action: "assign", reviewer_email, reviewer_name, slugs[]}` | POST | | Creates assignment rows (skips duplicates) |
| POST `{action: "notify", reviewer_email, reviewer_name, slugs[]}` | POST | | Sends review notification email |
| POST `{action: "reset", slugs[]}` | POST | | Deletes assignment + response rows for given slugs |

**Note on POST requests:** Google Apps Script redirects POSTs (302). Browser `fetch()` handles this automatically. From `curl`, use `curl -s -o /dev/null -w '%{redirect_url}'` to get the redirect URL, then `curl -sL` on that URL to get the response.
