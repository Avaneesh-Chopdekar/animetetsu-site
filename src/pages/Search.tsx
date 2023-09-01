import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GridLoading from "../components/GridLoading";
import type { Anime } from "../utils/types";
import { getSearchBk } from "../utils/api";

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const { data, isLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: () => getSearchBk(q!!),
  });

  return (
    <>
      <h1 className="text-base sm:text-lg md:text-xl mb-4">
        Search results for: <i>{q}</i>
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {!isLoading || data ? (
          data.map((anime: Anime) => (
            <li
              key={anime.animeId}
              className="mb-2 cursor-pointer"
              title={anime.animeTitle}
            >
              <Link to={`/${anime.animeId}`}>
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
                    ? '"Oshi no ko"'
                    : anime.animeId === "oshi-no-ko-dub"
                    ? '"Oshi no ko (Dub)"'
                    : anime.animeTitle}
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
