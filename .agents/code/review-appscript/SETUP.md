# COSMOS Review — Apps Script Setup Reference

How the Google Sheets + Apps Script review backend was set up, and how to redeploy or recreate it.

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

### 4. Deploy as web app (must be done from the editor)

`clasp deploy` creates versioned deployments but cannot set access to "Anyone" — this is a known limitation. The initial deployment must be done from the Apps Script editor:

1. Open the [script editor](https://script.google.com/d/1fTgEuLAUiI55KqHRxMLsm42Kgs7YnOiIdJM4B7ebl64VnVOfuBsITOL8/edit)
2. Click **Deploy** > **New deployment**
3. Click the gear icon next to "Select type" > choose **Web app**
4. Set "Execute as" > **Me**
5. Set "Who has access" > **Anyone**
6. Click **Deploy**
7. Authorize when prompted (Sheets + Gmail permissions)
8. Copy the Web app URL

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

## How to recreate from scratch

If the Google Sheet or Apps Script project is lost:

```bash
cd .agents/code/review-appscript
rm .clasp.json                  # remove old project reference
clasp create --type sheets --title "COSMOS Review Assignments"
clasp push --force
# Then deploy from the editor (step 4 above)
# Then call ?action=setup to create sheet tabs (step 5)
# Then update dev/review/config.json and review/app.js with the new URL
```

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
