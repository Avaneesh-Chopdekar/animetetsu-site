import { Link, useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import {
  getAnimeInfo,
  getEpisodeData,
  // getEpisodeDataBk,
} from "../utils/api";
import type { Episode } from "../utils/types";
import { Helmet } from "react-helmet-async";

export default function WatchEpisode() {
  const { epId } = useParams();
  let splitId = epId!!.split("-ep-");
  let animeId = splitId[0];
  let episodeNum = Number.parseInt(splitId[1]);
  const newAnimeId =
    animeId === "dr-stone-new-world"
      ? animeId.replace("new-world", "3rd-season")
      : animeId === "jujutsu-kaisen-2nd-season"
      ? animeId.replace("-2", "-tv-2")
      : animeId === "pokemon-xyz"
      ? animeId.replace("xyz", "xy-z")
      : animeId;

  const {
    data: epUrl,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
  } = useQuery({
    queryKey: ["episode", epId],
    queryFn: () => getEpisodeData(epId!!.replace("ep", "episode")),
  });

  // const { data: bk_epUrl, isLoading: isEpisodeLoadingBk } = useQuery({
  //   queryKey: ["backup episode", epId],
  //   queryFn: () => getEpisodeDataBk(epId!!.replace("ep", "episode")),
  // });

  const {
    data: animeInfo,
    isLoading: isAnimeLoading,
    isError: isAnimeError,
  } = useQuery({
    queryKey: ["anime-details", newAnimeId],
    queryFn: () => getAnimeInfo(newAnimeId),
  });

  let ifNotLastEpisode = false;

  if (!isAnimeLoading) {
    ifNotLastEpisode = episodeNum !== Number.parseInt(animeInfo.totalEpisodes);
  }

  return (
    <div>
      <Helmet>
        <title>
          {isAnimeLoading || isAnimeError
            ? "Animetetsu"
            : `${animeInfo.title} Episode ${episodeNum} | Animetetsu`}
        </title>
      </Helmet>
      <h2 className="text-sm xs:text-base sm:text-lg md:text-xl text-center">
        Playing{" "}
        {isAnimeLoading || (
          <span>
            <Link
              className="font-bold hover:underline focus:underline"
              to={`/${animeId}`}
            >
              {animeInfo.title}
            </Link>{" "}
            {animeInfo.totalEpisodes !== "1" && `Episode ${episodeNum}`}
          </span>
        )}
      </h2>
      <div className="flex justify-center">
        {/* <iframe
      className="my-4 aspect-video h-64 sm:h-[225px] md:h-[340px]"
      width="600"
      src={epUrl.headers.Referer}
      allowFullScreen
      scrolling="no"
    /> */}
        <div className="my-4 aspect-video h-[180px] sm:h-[225px] md:h-[340px]">
          {isEpisodeLoading || isEpisodeError || (
            <div key={epId}>
              <VideoPlayer src={epUrl.sources[epUrl.sources.length - 2].url} />
              {/* <VideoPlayer key={epId} src={bk_epUrl.sources[0].file} /> */}
            </div>
          )}
        </div>
      </div>
      <p className="text-sm sm:text-base text-center py-2">
        Reload the site if video not loaded
      </p>
      <div className="flex justify-center">
        {episodeNum !== 1 && (
          <Link
            className={`link-btn px-6 ${ifNotLastEpisode && "mr-4"}`}
            to={`/watch/${animeId}-ep-${episodeNum - 1}`}
          >
            Prev
          </Link>
        )}
        {ifNotLastEpisode && (
          <Link
            className="link-btn px-6"
            to={`/watch/${animeId}-ep-${episodeNum + 1}`}
          >
            Next
          </Link>
        )}
      </div>
      {isAnimeLoading ||
        (animeInfo.totalEpisodes !== "1" && (
          <div
            className={`mt-8 mb-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4`}
          >
            {[...animeInfo.episodes].reverse().map(
              (e: Episode) =>
                e.number === "0" || (
                  <Link
                    key={e.id}
                    className="link-btn"
                    to={`/watch/${e.id.replace("episode", "ep")}`}
                  >
                    {e.number}
                  </Link>
                )
            )}
          </div>
        ))}
    </div>
  );
}
