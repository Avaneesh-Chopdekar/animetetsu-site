import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import GokuFull from "../assets/goku-full.png";
import GokuHalf from "../assets/goku-half.png";

export default function Root() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function goToSearch() {
    navigate(
      `/search?${createSearchParams({
        q: query,
      }).toString()}`
    );
  }
  return (
    <main className="flex flex-col items-center">
      <Helmet>
        <title>Animetetsu</title>
      </Helmet>
      <div className="flex justify-evenly items-center w-3/4 sm:w-1/2 md:w-1/3">
        <Link
          to="/popular"
          className="text-white hover:text-sky-400 transition-colors ease-in-out"
        >
          Popular
        </Link>
        <Link
          to="/recent"
          className="text-white hover:text-sky-400 transition-colors ease-in-out"
        >
          Recent
        </Link>
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="my-4 px-6 py-3 rounded-full w-5/6 sm:w-1/2 lg:w-1/3 border-none outline-none bg-gray-700 text-white"
        placeholder="Enter Anime"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query !== "") {
            goToSearch();
          }
        }}
        autoFocus
      />
      <Link
        to={{
          pathname: query !== "" ? "/search" : "/",
          search: createSearchParams({
            q: query,
          }).toString(),
        }}
        className="link-btn px-6"
      >
        Search
      </Link>
      <img
        className="fixed bottom-8 h-2/3 -z-10 w-auto block sm:hidden"
        src={GokuFull}
        width={350}
        height={700}
        alt="goku"
      />
      <img
        className="fixed bottom-0 h-1/2 w-auto -z-10 hidden sm:block"
        src={GokuHalf}
        width={400}
        height={602}
        alt="goku"
      />
    </main>
  );
}
