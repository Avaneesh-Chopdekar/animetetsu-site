import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPopular } from "../utils/api";
import type { Anime } from "../utils/types";
import GridLoading from "../components/GridLoading";

export default function Popular() {
  const { data, isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopular(),
  });
  return (
    <>
      <Helmet>
        <title>Popular | Animetetsu</title>
      </Helmet>
      <h1 className="text-center text-base sm:text-lg md:text-xl mb-4">
        Popular this season
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {!isLoading ? (
          data.map((anime: Anime) => (
            <li
              key={anime.id}
              className="mb-2 cursor-pointer"
              title={anime.title}
            >
              <Link to={`/${anime.id}`}>
                <img
                  src={anime.image}
                  alt={anime.title}
                  width={250}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                  className="mx-auto mb-2 rounded-md w-40 h-64 lg:w-64 lg:h-96"
                />
                <div className="text-center text-xs md:text-sm">
                  {anime.id === "oshi-no-ko"
                    ? '"Oshi no ko"'
                    : anime.id === "oshi-no-ko-dub"
                    ? '"Oshi no ko (Dub)"'
                    : anime.title}
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
