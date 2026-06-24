/* ============================================================
   CHS Medical Handbook – Foundation Script
   ============================================================ */

(function () {
  'use strict';

  // ── DOM references ────────────────────────────────────────
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const cardsGrid   = document.getElementById('cards-grid');
  const noResults   = document.getElementById('no-results');
  const footerYear  = document.getElementById('footer-year');

  // ── Footer year ───────────────────────────────────────────
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ── Search ────────────────────────────────────────────────
  function filterCards(query) {
    const term  = query.trim().toLowerCase();
    const cards = cardsGrid ? Array.from(cardsGrid.querySelectorAll('.card')) : [];
    let   found = 0;

    cards.forEach(function (card) {
      const title    = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const desc     = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const matches  = !term || title.includes(term) || desc.includes(term) || keywords.includes(term);

      card.style.display = matches ? '' : 'none';
      if (matches) found++;
    });

    if (noResults) {
      noResults.classList.toggle('visible', term !== '' && found === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const value = searchInput.value;
      filterCards(value);

      if (searchClear) {
        searchClear.classList.toggle('visible', value.length > 0);
      }
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', function () {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      filterCards('');
      searchClear.classList.remove('visible');
    });
  }

  // ── Card navigation ───────────────────────────────────────
  if (cardsGrid) {
    cardsGrid.addEventListener('click', function (event) {
      const card = event.target.closest('.card');
      if (!card) return;
      event.preventDefault();
      const section = card.dataset.section;
      // Navigation placeholder – pages will be wired up in future iterations.
      console.info('[CHS] Navigate to section:', section);
    });

    // Keyboard activation for cards (Enter / Space)
    cardsGrid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.card');
      if (!card) return;
      event.preventDefault();
      card.click();
    });
  }
}());
