import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import type { Anime } from "../utils/types";
import { getRecentsBk } from "../utils/api";
import GridLoading from "../components/GridLoading";

export default function Recents() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent"],
    queryFn: () => getRecentsBk(),
  });
  return (
    <>
      <Helmet>
        <title>Recents | Animetetsu</title>
      </Helmet>
      <h1 className="text-center text-base sm:text-lg md:text-xl mb-4">
        Recent Releases
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {!isLoading ? (
          data.map((anime: Anime) => (
            <li
              key={anime.animeId}
              className="mb-2 cursor-pointer"
              title={anime.animeTitle}
            >
              <Link to={`/watch/${anime.episodeId.replace("episode", "ep")}`}>
                <img
                  src={anime.animeImg}
                  alt={anime.animeTitle}
                  width={250}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                  className="mx-auto mb-2 rounded-md w-40 h-64 lg:w-64 lg:h-96"
                />
                <div className="text-center text-xs md:text-sm">
                  {anime.animeId === "oshi-no-ko"
                    ? "Oshi no ko"
                    : anime.animeId === "oshi-no-ko-dub"
                    ? "Oshi no ko (Dub)"
                    : anime.animeTitle}
                </div>
                <div className="text-center text-xs md:text-sm opacity-50">
                  Episode {anime.episodeNum}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <>
            <GridLoading />
            <GridLoading />
            <GridLoading />
            <GridLoading />
            <GridLoading />
            <GridLoading />
            <GridLoading />
            <GridLoading />
          </>
        )}
      </ul>
    </>
  );
}
