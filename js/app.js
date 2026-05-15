'use strict';

/* ============================================================
   AUTH CONFIG — change these passwords here
   ============================================================ */
const USERS = {
  ebram: {
    name: 'Ebram',
    nameAr: 'ابرام',
    emoji: '🤵',
    image: 'assets/ebram.jpg',
    password: '2021579eS$2027'   // ← change to your password
  },
  sherry: {
    name: 'Sherry',
    nameAr: 'شيري',
    emoji: '👰',
    image: 'assets/sherry.jpg',
    password: '2021579eSH$2027'  // ← change to your password
  }
};
/* ============================================================ */

const STORAGE_KEY = 'ebram-sherry-wedding-v1';
const USER_KEY = 'ebram-sherry-current-user';
const TOKEN_KEY = 'wedding-gh-token';

/* ============================================================
   CLOUD SYNC CONFIG
============================================================ */
const REPO_OWNER = 'ebram-sifain';
const REPO_NAME = 'wedding-roadmap';
const STATE_FILE_PATH = 'data/state.json';
const STATE_BRANCH = 'main';

let state = null;
let activeFilter = 'all';
let currentUser = null;

// Save queue: rapid changes coalesce into a single pending save.
let saveQueue = Promise.resolve();
let savePending = false;

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', init);

function init() {
  // Try restore previously logged-in user
  const savedUser = localStorage.getItem(USER_KEY);
  if (savedUser) {
    try { currentUser = JSON.parse(savedUser); } catch (e) { currentUser = null; }
  }

  if (!currentUser) {
    setupLoginScreen();
    return;
  }

  bootApp();
}

async function bootApp() {
  setSyncStatus('loading');
  try {
    state = await loadState();
  } catch (err) {
    console.error('Failed to load data', err);
    document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;"><h2>Could not load tasks data</h2><p>Make sure <code>data/tasks.js</code> exists next to <code>index.html</code>.</p></div>';
    return;
  }
  document.getElementById('loginScreen').hidden = true;
  document.getElementById('app').hidden = false;
  applyUserRole();
  attachListeners();
  render();
  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
  setSyncStatus(localStorage.getItem(TOKEN_KEY) ? 'idle' : (isEditor() ? 'no-token' : 'viewer'));
}

/* ============================================================
   AUTH
============================================================ */
function setupLoginScreen() {
  const screen = document.getElementById('loginScreen');
  screen.hidden = false;
  document.getElementById('app').hidden = true;
  document.getElementById('userBadge').hidden = true;

  screen.querySelectorAll('.login-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const userKey = btn.dataset.user;
      if (userKey === 'viewer') {
        loginAsViewer();
      } else {
        promptPassword(userKey);
      }
    });
  });
}

function promptPassword(userKey) {
  const user = USERS[userKey];
  if (!user) return;
  const pwd = prompt(`Password for ${user.name} · باسوورد ${user.nameAr}:`);
  if (pwd === null) return;
  if (pwd !== user.password) {
    alert('Wrong password · باسوورد غلط');
    return;
  }

  // One-time GitHub token prompt for cloud sync
  if (!localStorage.getItem(TOKEN_KEY)) {
    const token = prompt(
      'Paste your GitHub token to enable cloud sync between you and Sherry.\n' +
      'الصق التوكن لتفعيل المزامنة بينك وبين شيري.\n\n' +
      '(Skip with empty if you only want local-only mode — متخليه فارغ لو عاوز محلي بس)'
    );
    if (token && token.trim()) {
      localStorage.setItem(TOKEN_KEY, token.trim());
    }
  }

  currentUser = {
    key: userKey,
    name: user.name,
    nameAr: user.nameAr,
    emoji: user.emoji,
    image: user.image,
    role: 'editor'
  };
  localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
  bootApp();
}

function loginAsViewer() {
  currentUser = {
    key: 'viewer',
    name: 'Viewer',
    nameAr: 'مشاهد',
    emoji: '👁️',
    image: null,
    role: 'viewer'
  };
  localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
  bootApp();
}

function logout() {
  localStorage.removeItem(USER_KEY);
  currentUser = null;
  location.reload();
}

function applyUserRole() {
  const body = document.body;
  body.classList.remove('viewer-mode', 'editor-mode');
  body.classList.add(currentUser.role === 'editor' ? 'editor-mode' : 'viewer-mode');

  const badge = document.getElementById('userBadge');
  badge.hidden = false;
  const avatar = currentUser.image
    ? `<img src="${currentUser.image}" class="avatar badge-avatar ${currentUser.key}" alt="" />`
    : `<span class="user-emoji">${currentUser.emoji}</span>`;
  badge.innerHTML = `
    ${avatar}
    <span class="user-name">${escapeHTML(currentUser.name)}</span>
    <span class="user-name-ar">${escapeHTML(currentUser.nameAr)}</span>
    <button class="btn-logout" type="button">Sign out · خروج</button>
  `;
  badge.querySelector('.btn-logout').addEventListener('click', logout);
}

function isEditor() {
  return currentUser && currentUser.role === 'editor';
}

async function loadState() {
  const [remote, local] = await Promise.all([
    fetchRemoteState(),
    Promise.resolve(readLocalState())
  ]);

  // Both exist — keep whichever was saved later. If local is newer, schedule
  // a re-sync so the remote catches up (handles "user edited then refreshed
  // before the save flushed").
  if (remote && local) {
    const remoteTime = new Date(remote._savedAt || 0).getTime();
    const localTime  = new Date(local._savedAt  || 0).getTime();
    if (localTime > remoteTime) {
      console.info('Local state is newer than remote — keeping local & re-pushing');
      setTimeout(() => { if (isEditor()) scheduleRemoteSave(); }, 200);
      return migrate(local);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    return migrate(remote);
  }
  if (remote) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    return migrate(remote);
  }
  if (local) return migrate(local);

  // Seed fallback
  if (!window.WEDDING_DATA) throw new Error('WEDDING_DATA not loaded');
  return migrate(JSON.parse(JSON.stringify(window.WEDDING_DATA)));
}

function readLocalState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    if (parsed && parsed.phases) return parsed;
  } catch (e) {
    console.warn('Corrupt local state');
  }
  return null;
}

async function fetchRemoteState() {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${STATE_BRANCH}/${STATE_FILE_PATH}?cb=${Date.now()}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.phases) return data;
  } catch (e) {
    console.warn('Could not fetch remote state', e);
  }
  return null;
}

function migrate(data) {
  data.phases.forEach(p => {
    if (!p.tasks) p.tasks = [];
    p.tasks.forEach(t => {
      if (typeof t.completed !== 'boolean') t.completed = false;
      if (typeof t.private !== 'boolean') t.private = false;
    });
  });
  return data;
}

function visibleTasks(phase) {
  /* Editors see everything; viewers don't see tasks marked private. */
  if (isEditor()) return phase.tasks;
  return phase.tasks.filter(t => !t.private);
}

function saveState() {
  // Timestamp every save so loadState can pick the freshest of local vs remote.
  state._savedAt = new Date().toISOString();
  state._savedBy = currentUser ? currentUser.key : 'unknown';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function scheduleRemoteSave() {
  if (!isEditor()) return;
  if (!localStorage.getItem(TOKEN_KEY)) {
    setSyncStatus('no-token');
    return;
  }
  // Mark a save as needed and chain it after the current one (if any).
  // Multiple rapid changes coalesce: only one save fires after the in-flight
  // one finishes, but it always uses the LATEST state.
  savePending = true;
  setSyncStatus('pending');
  saveQueue = saveQueue.then(async () => {
    if (!savePending) return;
    savePending = false;
    await saveRemoteState();
  });
}

async function saveRemoteState() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;
  setSyncStatus('syncing');

  try {
    // Always fetch the latest SHA before PUT. Cheaper than handling 409s and
    // ensures last-write-wins works cleanly when both Ebram and Sherry edit.
    let sha = null;
    const head = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${STATE_FILE_PATH}?ref=${STATE_BRANCH}&cb=${Date.now()}`,
      { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github+json' } }
    );
    if (head.ok) {
      sha = (await head.json()).sha;
    } else if (head.status === 401 || head.status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      setSyncStatus('auth-failed');
      return;
    }
    // head.status === 404 means the file doesn't exist yet — that's fine, we'll create it.

    const content = utf8ToBase64(JSON.stringify(state, null, 2));
    const body = {
      message: `Update by ${currentUser.name}`,
      content,
      branch: STATE_BRANCH
    };
    if (sha) body.sha = sha;

    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${STATE_FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (res.ok) {
      setSyncStatus('saved');
    } else if (res.status === 401 || res.status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      setSyncStatus('auth-failed');
    } else if (res.status === 409 || res.status === 422) {
      setSyncStatus('conflict');
    } else {
      setSyncStatus('error');
    }
  } catch (e) {
    console.error('Sync failed', e);
    setSyncStatus('error');
  }
}

function utf8ToBase64(str) {
  // Handles Arabic and other non-ASCII characters correctly
  return btoa(unescape(encodeURIComponent(str)));
}

function setSyncStatus(status) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  el.dataset.status = status;
  const messages = {
    loading:     '⏳ Loading…',
    idle:        '☁ Synced',
    pending:     '✎ Pending…',
    syncing:     '🔄 Saving…',
    saved:       '✓ Saved',
    conflict:    '⚠ Conflict — refresh',
    'auth-failed': '🔒 Re-login required',
    error:       '❌ Sync error',
    'no-token':  '⚠ No sync (local only)',
    viewer:      '👁 View only'
  };
  el.textContent = messages[status] || '';
  if (status === 'saved') {
    setTimeout(() => {
      if (el.dataset.status === 'saved') setSyncStatus('idle');
    }, 2500);
  }
}

/* ============================================================
   RENDER
============================================================ */
function render() {
  renderRoadmap();
  renderPhases();
  updateProgress();
  applyFilter();
}

/* -------- Visual Roadmap -------- */
function renderRoadmap() {
  const container = document.getElementById('roadmapMilestones');
  container.innerHTML = '';

  const fill = document.createElement('div');
  fill.className = 'roadmap-fill';
  fill.id = 'roadmapFill';
  container.appendChild(fill);

  state.phases.forEach((phase, idx) => {
    const status = getPhaseStatus(phase, idx);
    const progress = getPhaseProgress(phase);
    const hasTasks = phase.tasks.length > 0;

    const ms = document.createElement('div');
    ms.className = `milestone ${status}`;
    ms.dataset.phaseId = phase.id;
    ms.innerHTML = `
      <div class="milestone-card ${phase.milestone ? 'milestone-event' : ''}" data-phase-target="${phase.id}">
        <h3 class="milestone-name">${escapeHTML(phase.titleEn)}</h3>
        <div class="milestone-name-ar">${escapeHTML(phase.title)}</div>
        <div class="milestone-meta">
          <span class="milestone-date">📅 ${escapeHTML(phase.dateRange)}</span>
          <span class="milestone-status">${statusLabel(status)}</span>
        </div>
        ${hasTasks ? `
          <div class="milestone-progress">
            <div class="milestone-progress-bar">
              <div class="milestone-progress-fill" style="width: ${progress.percent}%"></div>
            </div>
            <div class="milestone-progress-text">${progress.done} / ${progress.total} · ${progress.percent}%</div>
          </div>
        ` : ''}
      </div>
      <div class="milestone-node">${phase.icon}</div>
    `;
    container.appendChild(ms);
  });

  // Click a milestone card → jump to detailed view
  container.querySelectorAll('.milestone-card').forEach(card => {
    card.addEventListener('click', () => {
      const phaseId = card.dataset.phaseTarget;
      const phaseEl = document.querySelector(`.phase[data-phase-id="${phaseId}"]`);
      if (phaseEl) {
        phaseEl.classList.add('expanded');
        phaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  setTimeout(updateRoadmapFill, 60);
}

function updateRoadmapFill() {
  const fill = document.getElementById('roadmapFill');
  if (!fill) return;
  const total = countAllTasks();
  const done = countDoneTasks();
  const percent = total ? (done / total) * 100 : 0;
  fill.style.height = `${percent}%`;
}

/* -------- Phases (detailed task lists) -------- */
function renderPhases() {
  const container = document.getElementById('phasesContainer');
  const previouslyExpanded = new Set(
    Array.from(container.querySelectorAll('.phase.expanded')).map(el => el.dataset.phaseId)
  );

  container.innerHTML = '';

  state.phases.forEach((phase, idx) => {
    const progress = getPhaseProgress(phase);
    const tasksForUser = visibleTasks(phase);
    const hasNoTasks = tasksForUser.length === 0;
    const isEvent = !!phase.milestone;

    const phaseEl = document.createElement('div');
    phaseEl.className = `phase${isEvent && phase.tasks.length === 0 ? ' event-only' : ''}`;
    if (previouslyExpanded.has(phase.id)) phaseEl.classList.add('expanded');
    phaseEl.dataset.phaseId = phase.id;
    phaseEl.dataset.idx = idx;

    phaseEl.innerHTML = `
      <div class="phase-header">
        <div class="phase-icon">${phase.icon}</div>
        <div class="phase-title-block">
          <h3 class="phase-title">
            <span>${escapeHTML(phase.titleEn)}</span>
            <span class="phase-title-ar">${escapeHTML(phase.title)}</span>
          </h3>
          <div class="phase-meta">
            <span class="phase-date">📅 ${escapeHTML(phase.dateRange)}</span>
          </div>
        </div>
        ${(!isEvent || phase.tasks.length > 0) ? `
          <div class="phase-progress-wrap">
            <div class="phase-progress-mini">
              <div class="phase-progress-mini-fill" style="width: ${progress.percent}%"></div>
            </div>
            <div class="phase-progress-text">${progress.percent}%</div>
            <div class="phase-toggle">▼</div>
          </div>
        ` : '<div style="font-size:24px">💝</div>'}
      </div>
      <div class="phase-body">
        <div class="phase-description">${escapeHTML(phase.description || '')}</div>
        <div class="task-list">
          ${tasksForUser.map(t => renderTaskHTML(t, phase.id)).join('')}
        </div>
        <div class="add-task-row">
          <button class="add-task-btn" data-add-to-phase="${phase.id}">
            + Add task · ضيف تاسك
          </button>
        </div>
      </div>
    `;
    container.appendChild(phaseEl);
  });

  attachPhaseInteractions();
}

function renderTaskHTML(task, phaseId) {
  return `
    <div class="task ${task.completed ? 'done' : ''} ${task.critical ? 'critical' : ''} ${task.private ? 'is-private' : ''}"
         data-task-id="${task.id}"
         data-phase-id="${phaseId}"
         data-owner="${task.owner}">
      <div class="task-check" data-action="toggle"></div>
      <div class="task-main">
        <div class="task-title">
          ${task.private ? '<span class="private-badge" title="Hidden from viewers">🔒</span>' : ''}
          ${escapeHTML(task.title)}
        </div>
        <div class="task-meta">
          <span class="owner-badge ${task.owner}">${ownerLabel(task.owner)}</span>
          ${task.deadline ? `<span class="task-deadline">${escapeHTML(task.deadline)}</span>` : ''}
          ${task.critical ? '<span class="task-critical-tag">⚠ Critical · حرج</span>' : ''}
          ${task.private ? '<span class="task-private-tag">🔒 Private · خاص</span>' : ''}
        </div>
        ${task.notes ? `<div class="task-notes">${escapeHTML(task.notes)}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="task-action toggle-private" data-action="toggle-private" title="Toggle private">${task.private ? '🔓' : '🔒'}</button>
        <button class="task-action" data-action="edit" title="Edit">✎</button>
        <button class="task-action delete" data-action="delete" title="Delete">×</button>
      </div>
    </div>
  `;
}

/* ============================================================
   STATUS / PROGRESS HELPERS
============================================================ */
function getPhaseStatus(phase, idx) {
  // Event phase (no tasks, just a milestone date)
  if (phase.milestone && phase.tasks.length === 0) {
    const eventDate = getEventDateForPhase(phase);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate && today >= eventDate) return 'done';
    // Mark as current only if all prior phases done
    const prior = state.phases.slice(0, idx);
    if (prior.every(p => isPhaseDone(p, state.phases.indexOf(p)))) return 'current';
    return 'upcoming';
  }
  if (isPhaseDone(phase, idx)) return 'done';

  // Current = first non-done that has tasks
  for (let i = 0; i < idx; i++) {
    if (!isPhaseDone(state.phases[i], i)) return 'upcoming';
  }
  return 'current';
}

function isPhaseDone(phase, idx) {
  if (phase.milestone && phase.tasks.length === 0) {
    const eventDate = getEventDateForPhase(phase);
    if (!eventDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today >= eventDate;
  }
  const tasks = visibleTasks(phase);
  if (tasks.length === 0) return true;
  return tasks.every(t => t.completed);
}

function getEventDateForPhase(phase) {
  if (phase.id === 'phase-1' && state.events.engagement) return new Date(state.events.engagement);
  if (phase.id === 'phase-8' && state.events.wedding) return new Date(state.events.wedding);
  return null;
}

function getPhaseProgress(phase) {
  const tasks = visibleTasks(phase);
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function statusLabel(status) {
  return {
    done:     '<span>✓ Done · تم</span>',
    current:  '<span>▶ In Progress · جارٍ</span>',
    upcoming: '<span>○ Upcoming · قادم</span>'
  }[status];
}

function ownerLabel(owner) {
  return {
    ebram:  'Ebram · ابرام',
    sherry: 'Sherry · شيري',
    both:   'Together · الاتنين'
  }[owner] || owner;
}

function countAllTasks() {
  return state.phases.reduce((sum, p) => sum + visibleTasks(p).length, 0);
}
function countDoneTasks() {
  return state.phases.reduce((sum, p) => sum + visibleTasks(p).filter(t => t.completed).length, 0);
}

/* ============================================================
   PROGRESS UI UPDATES
============================================================ */
function updateProgress() {
  const total = countAllTasks();
  const done = countDoneTasks();
  const percent = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('overallProgress').style.width = `${percent}%`;
  document.getElementById('overallStats').textContent = `${done} / ${total} · ${percent}%`;

  const allVisible = state.phases.flatMap(p => visibleTasks(p));
  document.getElementById('statTotal').textContent = allVisible.filter(t => t.completed).length;
  document.getElementById('statEbram').textContent = allVisible.filter(t => t.completed && t.owner === 'ebram').length;
  document.getElementById('statSherry').textContent = allVisible.filter(t => t.completed && t.owner === 'sherry').length;
  document.getElementById('statBoth').textContent = allVisible.filter(t => t.completed && t.owner === 'both').length;

  setTimeout(updateRoadmapFill, 80);
}

/* ============================================================
   COUNTDOWN
============================================================ */
function updateCountdown() {
  if (!state) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const setText = (id, target) => {
    const el = document.getElementById(id);
    if (!el || !target) return;
    const t = new Date(target);
    t.setHours(0, 0, 0, 0);
    const days = Math.round((t - today) / (1000 * 60 * 60 * 24));
    if (days > 0) el.textContent = `${days} days to go · باقي ${days} يوم`;
    else if (days === 0) el.textContent = "Today! · النهارده!";
    else el.textContent = `Done ✓ · تم`;
  };
  setText('engagementCountdown', state.events.engagement);
  setText('weddingCountdown', state.events.wedding);
}

/* ============================================================
   TASK INTERACTIONS
============================================================ */
function toggleTask(taskId, phaseId) {
  if (!isEditor()) return;
  const phase = state.phases.find(p => p.id === phaseId);
  if (!phase) return;
  const task = phase.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.completed = !task.completed;
  saveState();
  render();
  if (task.completed) triggerConfetti();
}

function deleteTask(taskId, phaseId) {
  if (!isEditor()) return;
  if (!confirm('Delete this task? · تمسح التاسك ده؟')) return;
  const phase = state.phases.find(p => p.id === phaseId);
  if (!phase) return;
  phase.tasks = phase.tasks.filter(t => t.id !== taskId);
  saveState();
  render();
}

function attachPhaseInteractions() {
  /* Per-element listeners only. Innerhtml replacement gives us fresh nodes
     each render, so these don't accumulate. Container-level delegation is
     set up once in attachListeners(). */
  const container = document.getElementById('phasesContainer');

  container.querySelectorAll('.phase-header').forEach(header => {
    header.addEventListener('click', () => {
      const phase = header.closest('.phase');
      if (phase.classList.contains('event-only')) return;
      phase.classList.toggle('expanded');
    });
  });

  container.querySelectorAll('[data-add-to-phase]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openTaskModal(null, btn.dataset.addToPhase);
    });
  });
}

function attachTaskDelegation() {
  /* One-time delegated click handler on the phases container.
     Container persists across renders; if we re-bind every render the
     handlers stack up and each click fires N times. */
  const container = document.getElementById('phasesContainer');
  container.addEventListener('click', e => {
    const action = e.target.closest('[data-action]');
    if (!action) return;
    const taskEl = e.target.closest('.task');
    if (!taskEl) return;

    e.stopPropagation();
    const { taskId, phaseId } = taskEl.dataset;
    const actionName = action.dataset.action;

    if (actionName === 'toggle') toggleTask(taskId, phaseId);
    else if (actionName === 'edit') openTaskModal(taskId, phaseId);
    else if (actionName === 'delete') deleteTask(taskId, phaseId);
    else if (actionName === 'toggle-private') togglePrivate(taskId, phaseId);
  });
}

function togglePrivate(taskId, phaseId) {
  if (!isEditor()) return;
  const phase = state.phases.find(p => p.id === phaseId);
  if (!phase) return;
  const task = phase.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.private = !task.private;
  saveState();
  render();
}

/* ============================================================
   MODAL (Add / Edit task)
============================================================ */
function openTaskModal(taskId = null, phaseId = null) {
  if (!isEditor()) return;
  const modal = document.getElementById('taskModal');
  const form = document.getElementById('taskForm');
  const titleEl = document.getElementById('modalTitle');
  const phaseSelect = document.getElementById('taskPhase');

  phaseSelect.innerHTML = state.phases
    .filter(p => !(p.milestone && p.tasks.length === 0))
    .map(p => `<option value="${p.id}">${escapeHTML(p.titleEn)} · ${escapeHTML(p.title)}</option>`)
    .join('');

  form.reset();
  document.getElementById('taskEditId').value = '';

  if (taskId) {
    const phase = state.phases.find(p => p.id === phaseId);
    const task = phase ? phase.tasks.find(t => t.id === taskId) : null;
    if (!task) return;
    titleEl.innerHTML = '<span class="en">Edit Task</span><span class="ar">عدّل التاسك</span>';
    document.getElementById('taskEditId').value = taskId;
    document.getElementById('taskTitle').value = task.title;
    phaseSelect.value = phaseId;
    document.getElementById('taskOwner').value = task.owner;
    document.getElementById('taskDeadline').value = task.deadline || '';
    document.getElementById('taskNotes').value = task.notes || '';
    document.getElementById('taskPrivate').checked = !!task.private;
  } else {
    titleEl.innerHTML = '<span class="en">Add Task</span><span class="ar">ضيف تاسك</span>';
    document.getElementById('taskPrivate').checked = false;
    if (phaseId) phaseSelect.value = phaseId;
  }

  modal.hidden = false;
  setTimeout(() => document.getElementById('taskTitle').focus(), 100);
}

function closeModal() {
  document.getElementById('taskModal').hidden = true;
}

function saveTaskFromModal(e) {
  e.preventDefault();
  if (!isEditor()) { closeModal(); return; }
  const editId = document.getElementById('taskEditId').value;
  const title = document.getElementById('taskTitle').value.trim();
  const newPhaseId = document.getElementById('taskPhase').value;
  const owner = document.getElementById('taskOwner').value;
  const deadline = document.getElementById('taskDeadline').value.trim();
  const notes = document.getElementById('taskNotes').value.trim();
  const isPrivate = document.getElementById('taskPrivate').checked;

  if (!title) return;

  const targetPhase = state.phases.find(p => p.id === newPhaseId);
  if (!targetPhase) return;

  if (editId) {
    let task = null;
    let oldPhase = null;
    for (const p of state.phases) {
      const t = p.tasks.find(t => t.id === editId);
      if (t) { task = t; oldPhase = p; break; }
    }
    if (!task) return;
    task.title = title;
    task.owner = owner;
    task.deadline = deadline;
    task.notes = notes;
    task.private = isPrivate;
    if (oldPhase.id !== newPhaseId) {
      oldPhase.tasks = oldPhase.tasks.filter(t => t.id !== editId);
      targetPhase.tasks.push(task);
    }
  } else {
    targetPhase.tasks.push({
      id: 'custom-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      title, owner, deadline, notes,
      completed: false,
      private: isPrivate,
      custom: true
    });
  }

  saveState();
  closeModal();
  render();
}

/* ============================================================
   FILTER
============================================================ */
function applyFilter() {
  document.querySelectorAll('.phase').forEach(phaseEl => {
    const tasks = phaseEl.querySelectorAll('.task');
    let visibleCount = 0;
    tasks.forEach(task => {
      const owner = task.dataset.owner;
      const done = task.classList.contains('done');
      const critical = task.classList.contains('critical');

      let show = true;
      switch (activeFilter) {
        case 'ebram':   show = owner === 'ebram'; break;
        case 'sherry':  show = owner === 'sherry'; break;
        case 'both':    show = owner === 'both'; break;
        case 'critical':show = critical; break;
        case 'pending': show = !done; break;
        default: show = true;
      }

      task.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (activeFilter !== 'all' && visibleCount > 0 && !phaseEl.classList.contains('event-only')) {
      phaseEl.classList.add('expanded');
    }
  });
}

/* ============================================================
   IMPORT / EXPORT / RESET
============================================================ */
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wedding-roadmap-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importDataFromFile(file) {
  if (!isEditor()) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.phases) throw new Error('Invalid file');
      state = migrate(data);
      saveState();
      render();
      alert('Imported successfully · تم الاستيراد');
    } catch (err) {
      alert('Invalid file · ملف غير صالح');
    }
  };
  reader.readAsText(file);
}

async function resetAll() {
  if (!isEditor()) return;
  if (!confirm('Reset everything? This will erase all check marks and custom tasks. · هتمسح كل اللي علمته والتاسكات الجديدة؟')) return;
  localStorage.removeItem(STORAGE_KEY);
  // Wipe remote state too so all devices restart from seed
  state = JSON.parse(JSON.stringify(window.WEDDING_DATA));
  state = migrate(state);
  saveState();
  render();
}

/* ============================================================
   CONFETTI
============================================================ */
function triggerConfetti() {
  const root = document.getElementById('confettiRoot');
  const colors = ['#E8B4B8', '#D4AF37', '#C97B84', '#F5E6D3', '#9CAF88', '#FFFFFF'];
  const count = 50;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.animationDuration = (1.6 + Math.random() * 1.3) + 's';
    if (Math.random() > 0.6) piece.style.borderRadius = '50%';
    if (Math.random() > 0.7) {
      piece.style.width = '14px';
      piece.style.height = '14px';
    }
    root.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

/* ============================================================
   EVENT WIRING
============================================================ */
function attachListeners() {
  attachTaskDelegation();

  // Click sync status to set/reset GitHub token
  const sync = document.getElementById('syncStatus');
  if (sync) {
    sync.addEventListener('click', () => {
      if (!isEditor()) return;
      const status = sync.dataset.status;
      if (status === 'no-token' || status === 'auth-failed' || status === 'error') {
        const token = prompt('Paste your GitHub token · الصق التوكن:');
        if (token && token.trim()) {
          localStorage.setItem(TOKEN_KEY, token.trim());
          scheduleRemoteSave();
        }
      }
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());
  document.getElementById('taskForm').addEventListener('submit', saveTaskFromModal);
  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));

  document.getElementById('exportBtn').addEventListener('click', exportData);
  document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', e => {
    if (e.target.files[0]) importDataFromFile(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('resetBtn').addEventListener('click', resetAll);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  window.addEventListener('resize', () => setTimeout(updateRoadmapFill, 200));

  // Warn user if they try to leave while a save is pending — keeps recent edits safe.
  window.addEventListener('beforeunload', e => {
    if (savePending && isEditor()) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

/* ============================================================
   UTILS
============================================================ */
function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
