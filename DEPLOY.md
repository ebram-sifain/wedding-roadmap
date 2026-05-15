# Deployment

Deploying to GitHub Pages at `https://ebram-sifain.github.io/wedding-roadmap/`.

---

## What's already done locally

- Passwords set in `js/app.js`
- Git initialised
- Initial commit made
- Default branch set to `main`

---

## Two manual steps left

### 1 — Create the empty repo on GitHub

Open https://github.com/new and fill in:

- **Repository name:** `wedding-roadmap`
- **Owner:** `ebram-sifain` (your account)
- **Visibility:** Public *(required for free GitHub Pages)*
- **Do NOT** check "Add a README", "Add .gitignore", or "Choose a license" — the repo must start empty so we can push.
- Click **Create repository**.

### 2 — Push from this machine

Run from the project folder:

```bash
cd "E:\Me and Sherry wedding"
git remote add origin https://github.com/ebram-sifain/wedding-roadmap.git
git push -u origin main
```

When prompted for credentials, use your GitHub username + a **personal access token** (not your account password — GitHub stopped accepting those for HTTPS pushes).

> Generate a token at: https://github.com/settings/tokens → "Generate new token (classic)" → check the `repo` scope → copy and use it as the password.

### 3 — Enable GitHub Pages

On the repo page → **Settings → Pages**:
- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)`
- **Save**

Wait ~60 seconds. The site goes live at:

**https://ebram-sifain.github.io/wedding-roadmap/**

---

## Updating later

```bash
git add .
git commit -m "What changed"
git push
```

GitHub Pages rebuilds within a minute. Ctrl+F5 on the live URL to see updates.
