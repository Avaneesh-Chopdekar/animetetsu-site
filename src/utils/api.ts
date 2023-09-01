export async function getRecents() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}recent-episodes`);
  const recents = await res.json();
  return recents.results;
}

export async function getRecentsBk() {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_URL_BK}recent-release`
  );
  const recents = await res.json();
  return recents;
}

export async function getPopular() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}top-airing`);
  const popular = await res.json();
  return popular.results;
}

export async function getPopularBk() {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL_BK}popular`);
  const popular = await res.json();
  return popular;
}

export async function getSearch(q: string) {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}${q}`);
  const search = await res.json();
  return search.results;
}

export async function getSearchBk(q: string) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_URL_BK}search?keyw=${q}`
  );
  const search = await res.json();
  return search;
}

export async function getAnimeInfo(animeId: string) {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}info/${animeId}`);
  const animeInfo = await res.json();
  return animeInfo;
}

export async function getAnimeInfoBk(animeId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_URL_BK}anime-details/${animeId}`
  );
  const animeInfo = await res.json();
  return animeInfo;
}

export async function getEpisodeData(episodeId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_URL}watch/${episodeId}`
  );
  const epData = await res.json();
  return epData;
}

export async function getEpisodeDataBk(episodeId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_URL_BK}vidcdn/watch/${episodeId}`
  );
  const epData = await res.json();
  return epData;
}
