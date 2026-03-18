import './styles.css';

import { fetchPokemonList, fetchPokemonDetails, fetchEvolutionSummaryByPokemonId } from './api.js';
import {
  buildPokemonCardHTML,
  buildPokemonModalHTML,
  buildComparePanelHTML,
  clearLoadingLine,
  clearSkeletonState,
  setLoadingLine,
  renderSkeletonCards,
  typeLabel,
} from './ui.js';

const PAGE_SIZE = 20;
const FAVORITES_KEY = 'vanillaDex:favorites';
const THEME_KEY = 'vanillaDex:theme';

const galleryEl = document.getElementById('gallery');
const bottomSentinelEl = document.getElementById('bottomSentinel');
const loadingLineEl = document.getElementById('loadingLine');
const emptyStateEl = document.getElementById('emptyState');
const metaLineEl = document.getElementById('metaLine');

const searchEl = document.getElementById('search');
const typeFilterEl = document.getElementById('typeFilter');
const favoritesOnlyEl = document.getElementById('favoritesOnly');
const themeToggleEl = document.getElementById('themeToggle');

const modalOverlayEl = document.getElementById('modalOverlay');
const modalContentEl = document.getElementById('modalContent');
const modalCloseEl = document.getElementById('modalClose');

const compareAEl = document.getElementById('compareA');
const compareBEl = document.getElementById('compareB');
const compareBtnEl = document.getElementById('compareBtn');
const compareResultEl = document.getElementById('compareResult');

const TYPE_OPTIONS = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

let allPokemon = [];
let cursor = 0;
let hasMore = true;
let loading = false;

let currentQuery = '';
let currentType = 'all';
let currentFavoritesOnly = false;

let favorites = new Set();

let activeModalId = null;

let compareOpen = false;

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.map((n) => Number(n)).filter((n) => Number.isFinite(n)));
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}

function isDarkThemePreferred() {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
}

function applyTheme(theme) {
  const t = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
    return;
  }
  applyTheme(isDarkThemePreferred() ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

function setMetaLine() {
  const shown = Array.from(galleryEl.querySelectorAll('[data-id]')).length;
  const typesText = currentType === 'all' ? 'All types' : typeLabel(currentType);
  const favLabel = currentFavoritesOnly ? ' + favorites' : '';
  metaLineEl.textContent = `Showing: ${shown}. Filter: ${typesText}${favLabel}${
    currentQuery ? ` • Search: "${currentQuery}"` : ''
  }`;
}

function matchesFiltersByMeta(meta, details) {
  const q = currentQuery;
  if (q && !meta.name.toLowerCase().includes(q)) return false;

  if (currentFavoritesOnly && !favorites.has(meta.id)) return false;

  if (currentType !== 'all') {
    if (!details) return false;
    const types = details.types || [];
    if (!types.includes(currentType)) return false;
  }
  return true;
}

async function loadNext() {
  if (loading || !hasMore) return;
  if (allPokemon.length === 0) return;

  loading = true;
  setLoadingLine(loadingLineEl, 'Loading Pokémon...');

  try {
    const appendedIds = [];
    let appendedCount = 0;

    while (appendedCount < PAGE_SIZE && cursor < allPokemon.length) {
      const meta = allPokemon[cursor];
      cursor += 1;

      // Quick check by name/favorites-only; types need details.
      const q = currentQuery;
      if (q && !meta.name.toLowerCase().includes(q)) continue;
      if (currentFavoritesOnly && !favorites.has(meta.id)) continue;

      const details = await fetchPokemonDetails(meta.id);
      if (!matchesFiltersByMeta(meta, details)) continue;

      const cardHTML = buildPokemonCardHTML(details, favorites.has(details.id));
      galleryEl.insertAdjacentHTML('beforeend', cardHTML);
      appendedIds.push(details.id);
      appendedCount += 1;
    }

    if (cursor >= allPokemon.length && appendedIds.length === 0) {
      hasMore = false;
    }

    emptyStateEl.hidden = galleryEl.querySelector('[data-id]') !== null;
    setMetaLine();
  } catch (e) {
    console.error(e);
    setLoadingLine(loadingLineEl, 'Failed to load. Please try again.');
  } finally {
    loading = false;
    if (!hasMore) clearLoadingLine(loadingLineEl);
    else clearLoadingLine(loadingLineEl);
  }
}

function resetAndLoad() {
  cursor = 0;
  hasMore = true;
  loading = false;
  galleryEl.innerHTML = '';
  clearSkeletonState(galleryEl);
  emptyStateEl.hidden = false;
  setMetaLine();
  loadNext();
}

function debounce(fn, ms = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

const onSearchInput = debounce(() => {
  currentQuery = (searchEl.value || '').trim().toLowerCase();
  resetAndLoad();
}, 180);

function initTypeOptions() {
  for (const t of TYPE_OPTIONS) {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    typeFilterEl.appendChild(opt);
  }
}

function buildCompareSelectOptions() {
  compareAEl.innerHTML = '';
  compareBEl.innerHTML = '';

  const first = allPokemon[0]?.id || 1;
  const second = allPokemon[1]?.id || 2;

  for (const meta of allPokemon) {
    const optA = document.createElement('option');
    optA.value = String(meta.id);
    optA.textContent = `${meta.id.toString().padStart(3, '0')} ${meta.name}`;

    const optB = document.createElement('option');
    optB.value = String(meta.id);
    optB.textContent = `${meta.id.toString().padStart(3, '0')} ${meta.name}`;

    compareAEl.appendChild(optA);
    compareBEl.appendChild(optB);
  }

  compareAEl.value = String(first);
  compareBEl.value = String(second);
}

async function updateCompare() {
  const aId = Number(compareAEl.value);
  const bId = Number(compareBEl.value);
  if (!Number.isFinite(aId) || !Number.isFinite(bId)) return;

  if (!compareOpen) return;

  compareResultEl.innerHTML = `<span class="spinner" aria-hidden="true"></span><span style="margin-left:10px">Comparing...</span>`;
  try {
    const [aPokemon, bPokemon] = await Promise.all([fetchPokemonDetails(aId), fetchPokemonDetails(bId)]);
    compareResultEl.innerHTML = buildComparePanelHTML(aPokemon, bPokemon);
  } catch (e) {
    console.error(e);
    compareResultEl.textContent = 'Comparison failed.';
  }
}

function openModalLoading(pokemonId) {
  activeModalId = pokemonId;
  modalContentEl.innerHTML = `
    <div class="panel">
      <span class="spinner" aria-hidden="true"></span>
      <span style="margin-left:10px">Loading details...</span>
    </div>
  `;
}

async function openPokemonModal(pokemonId) {
  openModalLoading(pokemonId);

  try {
    const [pokemon, evo] = await Promise.all([
      fetchPokemonDetails(pokemonId),
      fetchEvolutionSummaryByPokemonId(pokemonId),
    ]);

    if (activeModalId !== pokemonId) return; // modal was switched quickly

    const isFav = favorites.has(pokemonId);
    modalContentEl.innerHTML = buildPokemonModalHTML(pokemon, evo, isFav);

    // Bind favorite inside modal.
    const favBtn = modalContentEl.querySelector('#modalFavBtn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(pokemonId);
        // Re-render modal to update heart.
        openPokemonModal(pokemonId);
      });
    }
  } catch (e) {
    console.error(e);
    modalContentEl.innerHTML = `<div class="panel">Failed to load details.</div>`;
  }
}

function showModal() {
  modalOverlayEl.hidden = false;
}

function hideModal() {
  modalOverlayEl.hidden = true;
  modalContentEl.innerHTML = '';
  activeModalId = null;
}

function toggleFavorite(id) {
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  saveFavorites();
}

function refreshCardFavoriteStates() {
  for (const card of galleryEl.querySelectorAll('[data-id]')) {
    const id = Number(card.getAttribute('data-id'));
    const heart = card.querySelector('.heart-icon');
    if (!heart) continue;
    heart.classList.toggle('is-favorite', favorites.has(id));
  }
}

function applyFavoritesToModalIfOpen() {
  // Modal re-render is handled in openPokemonModal to keep logic simple.
}

async function init() {
  favorites = loadFavorites();

  // Always start with modal closed.
  hideModal();

  initTheme();
  initTypeOptions();
  compareResultEl.innerHTML = '';
  compareResultEl.hidden = true;
  compareOpen = false;
  compareBtnEl.textContent = 'Compare';

  // Initial empty UI
  emptyStateEl.hidden = true;
  setMetaLine();

  themeToggleEl.addEventListener('click', () => toggleTheme());

  searchEl.addEventListener('input', onSearchInput);
  typeFilterEl.addEventListener('change', () => {
    currentType = typeFilterEl.value;
    resetAndLoad();
  });
  favoritesOnlyEl.addEventListener('change', () => {
    currentFavoritesOnly = favoritesOnlyEl.checked;
    resetAndLoad();
  });

  modalCloseEl.addEventListener('click', hideModal);
  modalOverlayEl.addEventListener('click', (e) => {
    // Close when clicking on the overlay backdrop (outside of the modal window).
    if (!e.target.closest('.modal')) hideModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlayEl.hidden) hideModal();
  });

  // Event delegation for cards and hearts.
  galleryEl.addEventListener('click', (e) => {
    // Prevent any synthetic/programmatic clicks from triggering modal open.
    if (!e.isTrusted) return;

    const heartBtn = e.target.closest('.heart-btn');
    if (heartBtn && heartBtn.dataset.fav) {
      e.stopPropagation();
      const id = Number(heartBtn.dataset.fav);
      toggleFavorite(id);
      refreshCardFavoriteStates();
      return;
    }

    const card = e.target.closest('.pokemon-card[data-id]');
    if (card) {
      const id = Number(card.getAttribute('data-id'));
      if (Number.isFinite(id)) {
        showModal();
        openPokemonModal(id);
      }
    }
  });

  // Compare
  const setCompareOpen = (open) => {
    compareOpen = open;
    compareResultEl.hidden = !open;
    if (!open) compareResultEl.innerHTML = '';
    compareBtnEl.textContent = open ? 'Hide' : 'Compare';
  };

  compareBtnEl.addEventListener('click', async () => {
    if (compareOpen) {
      setCompareOpen(false);
      return;
    }
    setCompareOpen(true);
    await updateCompare();
  });

  compareAEl.addEventListener('change', () => {
    if (compareOpen) updateCompare();
  });
  compareBEl.addEventListener('change', () => {
    if (compareOpen) updateCompare();
  });

  // Load list & init compare options.
  const initialLoadingMsg = () => {
    renderSkeletonCards(galleryEl, PAGE_SIZE);
    setLoadingLine(loadingLineEl, 'Loading Pokédex...');
  };

  initialLoadingMsg();
  try {
    allPokemon = await fetchPokemonList(151);
    clearSkeletonState(galleryEl);
    galleryEl.innerHTML = '';
    buildCompareSelectOptions();
    emptyStateEl.hidden = true;

    // Reset filters default values.
    currentQuery = '';
    currentType = 'all';
    currentFavoritesOnly = false;
    searchEl.value = '';
    typeFilterEl.value = 'all';
    favoritesOnlyEl.checked = false;

    setMetaLine();

    // Infinite scroll
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) loadNext();
      },
      { root: null, threshold: 0.1, rootMargin: '200px' }
    );
    io.observe(bottomSentinelEl);

    // First chunk
    cursor = 0;
    hasMore = true;
    loading = false;
    emptyStateEl.hidden = false;
    await loadNext();
  } catch (e) {
    console.error(e);
    setLoadingLine(loadingLineEl, 'Failed to load Pokédex.');
  } finally {
    clearLoadingLine(loadingLineEl);
  }
}

init();

