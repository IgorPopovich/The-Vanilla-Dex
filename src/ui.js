export const TYPE_COLORS = {
  bug: '#A6B91A',
  dark: '#705746',
  dragon: '#6F35FC',
  electric: '#F7D02C',
  fairy: '#D685AD',
  fighting: '#C22E28',
  fire: '#EE8130',
  flying: '#A98FF3',
  ghost: '#735797',
  grass: '#7AC74C',
  ground: '#E2BF65',
  ice: '#96D9D6',
  normal: '#A8A77A',
  poison: '#A33EA1',
  psychic: '#F95587',
  rock: '#B6A136',
  steel: '#B7B7CE',
  water: '#6390F0',
};

export function capitalize(str) {
  return String(str || '')
    .trim()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function typeLabel(typeName) {
  return capitalize(typeName);
}

export function getTypeColor(typeName) {
  return TYPE_COLORS[typeName] || '#60a5fa';
}

export function getPrimaryTypeColor(primaryType) {
  return getTypeColor(primaryType);
}

export function statPercent(statKey, value) {
  const maxByStat = {
    hp: 250,
    attack: 190,
    defense: 230,
    speed: 200,
  };
  const max = maxByStat[statKey] || 200;
  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}

export function setLoadingLine(el, message) {
  el.innerHTML = `
    <span class="spinner" aria-hidden="true"></span>
    <span style="margin-left:10px">${message || 'Loading...'}</span>
  `;
}

export function clearLoadingLine(el) {
  el.textContent = '';
}

export function renderSkeletonCards(container, count = 20) {
  const skeletons = Array.from({ length: count }, () => `<div class="skeleton-card"></div>`).join('');
  container.classList.add('skeleton-grid');
  container.innerHTML = skeletons;
}

export function clearSkeletonState(container) {
  container.classList.remove('skeleton-grid');
}

export function buildPokemonCardHTML(pokemon, isFavorite) {
  const id3 = String(pokemon.id).padStart(3, '0');
  const cardBg = getPrimaryTypeColor(pokemon.primaryType);
  const typesHtml = (pokemon.types || [])
    .slice(0, 2)
    .map((t) => `<span class="type-badge" title="${t}">${typeLabel(t)}</span>`)
    .join('');

  const heartClass = isFavorite ? 'is-favorite' : '';

  // Use button for heart to keep UX nice; click won't open modal.
  return `
    <article class="pokemon-card" data-id="${pokemon.id}" style="--card-bg:${cardBg}" tabindex="0" role="button" aria-label="Open ${capitalize(
    pokemon.name
  )}">
      <button class="heart-btn" type="button" data-fav="${pokemon.id}" aria-label="Add to favorites">
        <span class="heart-icon ${heartClass}" aria-hidden="true">♥</span>
      </button>

      <div class="pokemon-card__image-wrap">
        <img src="${pokemon.image}" alt="${capitalize(pokemon.name)}" loading="lazy" />
      </div>

      <div class="pokemon-card__content">
        <div class="pokemon-card__title">
          <span class="pokemon-card__id">#${id3}</span>
          <h3 class="pokemon-card__name">${capitalize(pokemon.name)}</h3>
        </div>
        <div class="pokemon-card__types">${typesHtml}</div>
      </div>
    </article>
  `;
}

export function buildEmptyCompareHTML() {
  return `<div class="muted">Select A and B to compare.</div>`;
}

function statRowHTML({ statKey, statName, value }) {
  const percent = statPercent(statKey, value);
  return `
    <div class="statRow">
      <div class="statName">${statName}</div>
      <div>
        <div class="progress" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="250">
          <div class="bar" style="width:${percent}%"></div>
        </div>
      </div>
      <div class="statValue">${value}</div>
    </div>
  `;
}

export function buildPokemonModalHTML(pokemon, evolutionSummary, isFavorite) {
  const id3 = String(pokemon.id).padStart(3, '0');
  const heartClass = isFavorite ? 'is-favorite' : '';
  const evoFrom = evolutionSummary?.from ? capitalize(evolutionSummary.from) : '—';
  const evoInto = evolutionSummary?.into?.length
    ? evolutionSummary.into.map((n) => `<li>${capitalize(n)}</li>`).join('')
    : `<li>—</li>`;

  const typesHtml = (pokemon.types || [])
    .slice(0, 2)
    .map((t) => `<span class="type-badge" title="${t}">${typeLabel(t)}</span>`)
    .join('');

  const stats = pokemon.stats || { hp: 0, attack: 0, defense: 0, speed: 0 };
  const statBg = getPrimaryTypeColor(pokemon.primaryType);

  return `
    <div class="modalHeader">
      <div class="modalHeader__left">
        <img class="modalPokemonImage" src="${pokemon.image}" alt="${capitalize(pokemon.name)}" />
        <div class="modalHeader__title">
          <h2 style="padding-bottom: 8px;" id="modalTitle">${capitalize(pokemon.name)}</h2>
          <div class="id">#${id3} • ${typesHtml}</div>
        </div>
      </div>

      <div>
        <button class="heart-btn" id="modalFavBtn" type="button" data-id="${pokemon.id}" aria-label="Favorite">
          <span class="heart-icon ${heartClass}" aria-hidden="true">♥</span>
        </button>
      </div>
    </div>

    <div class="grid2">
      <div class="panel" style="--card-bg:${statBg}">
        <h3 style="margin:0 0 10px">Stats</h3>
        ${statRowHTML({ statKey: 'hp', statName: 'HP', value: stats.hp })}
        ${statRowHTML({ statKey: 'attack', statName: 'Attack', value: stats.attack })}
        ${statRowHTML({ statKey: 'defense', statName: 'Defense', value: stats.defense })}
        ${statRowHTML({ statKey: 'speed', statName: 'Speed', value: stats.speed })}
      </div>

      <div class="panel">
        <h3 style="margin:0 0 10px">Abilities</h3>
        <ul class="abilityList">
          ${(pokemon.abilities || []).map((a) => `<li>${capitalize(a)}</li>`).join('')}
        </ul>

        <div class="evoFrom">
          Evolution:
          <div class="evoFrom">
            <div>From: <strong>${evoFrom}</strong></div>
            <div class="evoTo" style="margin-top:8px">To: <strong>${
              evolutionSummary?.into?.length ? evolutionSummary.into.map(capitalize).join(', ') : '—'
            }</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin:0 0 10px">Evolution Chain</h3>
      <div class="evoFrom">From: <strong>${evoFrom}</strong></div>
      <div class="evoTo">To:</div>
      <ul class="evoList">${evoInto}</ul>
    </div>
  `;
}

export function buildComparePanelHTML(aPokemon, bPokemon) {
  const statsA = aPokemon.stats || { hp: 0, attack: 0, defense: 0, speed: 0 };
  const statsB = bPokemon.stats || { hp: 0, attack: 0, defense: 0, speed: 0 };

  const statKeys = [
    { key: 'hp', name: 'HP' },
    { key: 'attack', name: 'Attack' },
    { key: 'defense', name: 'Defense' },
    { key: 'speed', name: 'Speed' },
  ];

  function compareColumnHTML(pokemon, stats) {
    const bg = getPrimaryTypeColor(pokemon.primaryType);
    return `
      <div class="compareCard" style="--card-bg:${bg}">
        <h3>${capitalize(pokemon.name)}</h3>
        <div class="small">#${String(pokemon.id).padStart(3, '0')} • ${(pokemon.types || []).slice(0, 2).map(typeLabel).join(' / ')}</div>
        <div class="compareStats" aria-label="Stats">
          ${statKeys
            .map((s) => {
              const v = stats[s.key] || 0;
              const pc = statPercent(s.key, v);
              return `
                <div class="statRow" style="grid-template-columns: 90px 1fr 56px">
                  <div class="statName">${s.name}</div>
                  <div>
                    <div class="progress">
                      <div class="bar" style="width:${pc}%;"></div>
                    </div>
                  </div>
                  <div class="statValue">${v}</div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="compareStats__row">
      ${compareColumnHTML(aPokemon, statsA)}
      ${compareColumnHTML(bPokemon, statsB)}
    </div>
  `;
}

