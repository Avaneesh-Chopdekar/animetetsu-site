export type Anime = {
  id: string;
  title: string;
  image: string;
  episodeId: string;
  episodeNumber: string;
  releaseDate: string;
};

export type AnimeBk = {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  episodeId: string;
  episodeNum: string;
  releasedDate: string;
};

export type Episode = {
  id: string;
  number: string;
};

export type EpisodeBk = {
  episodeId: string;
  episodeNum: string;
};

export type AnimeInfo = {
  id: string;
  title: string;
  type: string;
  image: string;
  status: string;
  releaseDate: string;
  genres: string[];
  totalEpisodes: number;
  otherName: string;
  synopsis: string;
  episodes: Episode[];
};

export type AnimeInfoBk = {
  animeId: string;
  animeTitle: string;
  type: string;
  animeImg: string;
  status: string;
  releasedDate: string;
  genres: string[];
  totalEpisodes: string;
  otherNames: string;
  synopsis: string;
  episodesList: EpisodeBk[];
};

export type EpisodeSrc = {
  url: string;
  isM3u8: boolean;
  quality: string;
};

export type EpisodeInfo = {
  headers: { Referer: string };
  sources: EpisodeSrc[];
  download: string;
};
