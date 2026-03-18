const API_BASE = 'https://pokeapi.co/api/v2';

const detailsCache = new Map();
const evolutionCache = new Map();

function extractPokemonId(url) {
  const match = String(url).match(/\/pokemon\/(\d+)\//);
  if (!match) return null;
  return Number(match[1]);
}

export function parsePokemonIdFromUrl(url) {
  return extractPokemonId(url);
}

export async function fetchPokemonList(limit = 151) {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon list: ${res.status}`);
  const data = await res.json();
  return data.results
    .map((r) => ({
      name: r.name,
      url: r.url,
      id: extractPokemonId(r.url),
    }))
    .filter((p) => Number.isFinite(p.id));
}

function pickOfficialArtwork(sprites) {
  return (
    sprites?.other?.['official-artwork']?.front_default ||
    sprites?.other?.['official-artwork']?.front_shiny ||
    sprites?.front_default ||
    sprites?.front_shiny ||
    ''
  );
}

function normalizeStats(statsArr) {
  const result = { hp: 0, attack: 0, defense: 0, speed: 0 };
  for (const s of statsArr || []) {
    const statName = s?.stat?.name;
    const base = s?.base_stat;
    if (!statName || typeof base !== 'number') continue;
    if (statName in result) result[statName] = base;
  }
  return result;
}

export async function fetchPokemonDetails(id) {
  if (detailsCache.has(id)) return detailsCache.get(id);

  const res = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon details (${id}): ${res.status}`);
  const d = await res.json();

  const types = (d.types || []).map((t) => t.type.name);
  const primaryType = types[0] || 'normal';
  const image = pickOfficialArtwork(d.sprites);

  const details = {
    id: d.id,
    name: d.name,
    image,
    types,
    primaryType,
    abilities: (d.abilities || [])
      .map((a) => a?.ability?.name)
      .filter(Boolean),
    stats: normalizeStats(d.stats),
  };

  detailsCache.set(id, details);
  return details;
}

function traverseEvolutionChain(chainRoot, targetName) {
  let from = null;
  let into = [];

  function dfs(node, parentName) {
    if (!node) return false;
    const nodeName = node?.species?.name;
    if (!nodeName) return false;

    if (nodeName === targetName) {
      from = parentName;
      into = (node.evolves_to || []).map((x) => x?.species?.name).filter(Boolean);
      return true;
    }

    for (const child of node.evolves_to || []) {
      if (dfs(child, nodeName)) return true;
    }
    return false;
  }

  dfs(chainRoot, null);
  return { from, into };
}

export async function fetchEvolutionSummaryByPokemonId(id) {
  if (evolutionCache.has(id)) return evolutionCache.get(id);

  const speciesRes = await fetch(`${API_BASE}/pokemon-species/${id}`);
  if (!speciesRes.ok)
    throw new Error(`Failed to fetch pokemon species (${id}): ${speciesRes.status}`);
  const speciesData = await speciesRes.json();

  const chainUrl = speciesData?.evolution_chain?.url;
  if (!chainUrl) {
    const empty = { from: null, into: [] };
    evolutionCache.set(id, empty);
    return empty;
  }

  const chainRes = await fetch(chainUrl);
  if (!chainRes.ok) throw new Error(`Failed to fetch evolution chain: ${chainRes.status}`);
  const chainData = await chainRes.json();

  const targetName = speciesData?.name;
  const summary = traverseEvolutionChain(chainData?.chain, targetName);
  evolutionCache.set(id, summary);
  return summary;
}

export function getCachedPokemonDetailsCount() {
  return detailsCache.size;
}

