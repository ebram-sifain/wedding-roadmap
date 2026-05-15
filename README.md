# Our Wedding Roadmap · خريطة طريقنا للفرح

**Ebram & Sherry · إبرام و شيري** — a visual journey to **January 7, 2027**.

A simple bilingual (English + Arabic) wedding planner with a visual roadmap, milestone markers, and task tracking — built as a static site so it can be hosted for free on GitHub Pages or Netlify.

---

## Features

- 🔐 **Three sign-in modes** — Ebram, Sherry, or View-only (for parents and family). Editors can add/edit/delete; viewers can only see.
- 🗺️ **Visual roadmap** — 10 milestones from engagement to honeymoon, with a "you are here" marker that moves as you make progress.
- 🌍 **Bilingual** — every label in English and Arabic.
- ✅ **Task tracking** — check off the pre-filled tasks; add your own anytime.
- 👤 **Owner tagging** — each task assigned to Ebram, Sherry, or Both.
- ⚠️ **Critical-path flags** — tasks that block downstream work are marked.
- 📊 **Live stats** — overall progress + per-person counters.
- 💾 **Local persistence** — your progress is saved in the browser (localStorage).
- 📤 **Export / Import JSON** — back up your state or share it between devices.
- 🎉 Confetti on task completion (because why not).

---

## Project Structure

```
.
├── index.html          # Page structure
├── css/
│   └── styles.css      # All styling
├── js/
│   └── app.js          # Logic, rendering, storage
├── data/
│   └── tasks.js        # Initial task data (the "store")
└── README.md
```

No build step. No dependencies. **Just open `index.html` in any browser** — works directly from your filesystem.

---

## Running locally

**Easiest:** double-click `index.html`. It loads in your default browser via `file://` and works immediately.

**If you prefer a real web server** (e.g. for sharing on your local network):

```bash
# Python
python -m http.server 8080

# Node.js
npx serve

# Or in VS Code: install "Live Server" extension, right-click index.html → "Open with Live Server"
```

---

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `ebram-sherry-wedding`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — wedding roadmap"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub → **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main`, folder `/ (root)`
   - Save.
4. After ~30 seconds your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## Sharing progress

Each browser keeps its own state (localStorage). If you want Ebram and Sherry to both see the same progress:

- Use the **Export** button → it downloads a JSON file.
- The other person opens the site → clicks **Import** → picks the file.

Or, more practically: pick one device as the "source of truth," and screenshot the roadmap to share with the other.

---

## Customizing

- **Change passwords** → top of `js/app.js`, the `USERS` object. Default passwords are `ebram2027` and `sherry2027` — please change these before sharing the link.
- **Edit initial tasks** → `data/tasks.js` (it's JSON wrapped in `window.WEDDING_DATA = …;`). After editing, click **Reset** in the app to reload from the file.
- **Change colors / fonts** → `css/styles.css` (top `:root` block has all the variables).
- **Change wedding/engagement date** → `data/tasks.js`, top-level `events` object.

---

Built with love · صُنع بحب 💕
