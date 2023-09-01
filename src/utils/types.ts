export type Anime = {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  episodeId: string;
  episodeNum: string;
  releasedDate: string;
};

export type Episode = {
  episodeId: string;
  episodeNum: string;
};

export type AnimeInfo = {
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
  episodesList: Episode[];
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
