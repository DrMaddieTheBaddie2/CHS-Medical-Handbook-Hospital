/**
 * CHS Medical Handbook — Core App Logic
 * Handles dynamic data rendering and UI interactions.
 */

'use strict';

/* ---------------------------------------------------------
   Quick Access data
   Add or remove entries here to expand the grid.
   --------------------------------------------------------- */
const QUICK_ACCESS_ITEMS = [
  {
    id: 'protocols',
    label: 'Protocols',
    sublabel: 'Clinical guidelines',
    icon: '📋',
    iconClass: 'quick-card__icon--blue',
    href: '#',
  },
  {
    id: 'medications',
    label: 'Medications',
    sublabel: 'Drug reference',
    icon: '💊',
    iconClass: 'quick-card__icon--green',
    href: '#',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    sublabel: 'Critical procedures',
    icon: '🚨',
    iconClass: 'quick-card__icon--red',
    href: '#',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    sublabel: 'Staff directory',
    icon: '📞',
    iconClass: 'quick-card__icon--teal',
    href: '#',
  },
];

/* ---------------------------------------------------------
   Notices data
   --------------------------------------------------------- */
const NOTICES = [
  {
    id: 'notice-1',
    title: 'New triage protocol effective from today',
    meta: 'Posted today · Clinical Operations',
    type: 'info',
    href: '#',
  },
  {
    id: 'notice-2',
    title: 'Pharmacy restocked — check updated formulary',
    meta: 'Posted yesterday · Pharmacy',
    type: 'success',
    href: '#',
  },
  {
    id: 'notice-3',
    title: 'Scheduled maintenance: East Wing lift offline',
    meta: '24 Jun 2026 · Facilities',
    type: 'warning',
    href: '#',
  },
];

/* ---------------------------------------------------------
   Render helpers
   --------------------------------------------------------- */

/**
 * Builds and inserts Quick Access cards into the DOM.
 * @param {HTMLElement} container
 * @param {Array} items
 */
function renderQuickAccess(container, items) {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const card = document.createElement('a');
    card.href = item.href;
    card.className = 'quick-card';
    card.setAttribute('role', 'listitem');

    card.innerHTML = `
      <div class="quick-card__icon ${item.iconClass}" aria-hidden="true">${item.icon}</div>
      <div>
        <div class="quick-card__label">${item.label}</div>
        <div class="quick-card__sublabel">${item.sublabel}</div>
      </div>
    `;

    fragment.appendChild(card);
  });

  container.setAttribute('role', 'list');
  container.appendChild(fragment);
}

/**
 * Builds and inserts notice cards into the DOM.
 * @param {HTMLElement} container
 * @param {Array} notices
 */
function renderNotices(container, notices) {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  notices.forEach((notice) => {
    const item = document.createElement('li');

    const card = document.createElement('a');
    card.href = notice.href;
    card.className = `notice-card notice-card--${notice.type}`;

    card.innerHTML = `
      <span class="notice-card__dot" aria-hidden="true"></span>
      <div class="notice-card__body">
        <div class="notice-card__title">${notice.title}</div>
        <div class="notice-card__meta">${notice.meta}</div>
      </div>
      <span class="notice-card__chevron" aria-hidden="true">›</span>
    `;

    item.appendChild(card);
    fragment.appendChild(item);
  });

  container.appendChild(fragment);
}

/* ---------------------------------------------------------
   Search
   --------------------------------------------------------- */

/**
 * Wires up the search input for future search logic.
 * @param {HTMLInputElement} input
 */
function initSearch(input) {
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    // Placeholder: dispatch a custom event for external handlers to use.
    document.dispatchEvent(new CustomEvent('chs:search', { detail: { query } }));
  });
}

/* ---------------------------------------------------------
   Greeting
   --------------------------------------------------------- */

/**
 * Updates the greeting text based on the current time of day.
 * @param {HTMLElement} el
 */
function updateGreeting(el) {
  if (!el) return;

  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  el.textContent = greeting + ', ';
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
function init() {
  // Greeting
  const greetingEl = document.querySelector('.search-greeting');
  if (greetingEl) {
    const textNode = greetingEl.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const hour = new Date().getHours();
      let greeting = 'Good morning';
      if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
      else if (hour >= 17) greeting = 'Good evening';
      textNode.textContent = `${greeting}, `;
    }
  }

  // Quick Access
  const qaGrid = document.getElementById('quick-access-grid');
  renderQuickAccess(qaGrid, QUICK_ACCESS_ITEMS);

  // Notices
  const noticeList = document.getElementById('notice-list');
  renderNotices(noticeList, NOTICES);

  // Search
  const searchInput = document.getElementById('search-input');
  initSearch(searchInput);
}

document.addEventListener('DOMContentLoaded', init);
