"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import React from "react";
import { FilmType } from "../page";
import Image from "next/image";
import Link from "next/link";

const GET_MOVIE_BY_ID = gql`
  query GetMovie($filmId: ID!) {
    film(id: $filmId) {
      id
      title
      episodeID
      director
      openingCrawl
      releaseDate
      producers
    }
  }
`;

type MovieType = FilmType & { openingCrawl: string; episodeID: number };

const getMovieImageByEpisode = (episodeID: number) => {
  switch (episodeID) {
    case 1:
      return "/img/ep-one.jpeg";
    case 2:
      return "/img/ep-two.jpeg";
    case 3:
      return "/img/ep-three.jpeg";
    case 4:
      return "/img/ep-four.jpeg";
    case 5:
      return "/img/ep-five.jpeg";
    case 6:
      return "/img/ep-six.jpeg";
    default:
      return "/placeholder.svg";
  }
};

const toRomanNumerals = (episodeNumber: number) => {
  let startingValue = episodeNumber;
  let result = "";
  while (startingValue >= 1) {
    if (startingValue >= 10) {
      result += "X";
      startingValue -= 10;
      continue;
    } else if (startingValue === 9) {
      result += "IX";
      startingValue -= 9;
      continue;
    } else if (startingValue >= 5) {
      result += "V";
      startingValue -= 5;
      continue;
    } else if (startingValue === 4) {
      result += "IV";
      startingValue -= 4;
      continue;
    } else if (startingValue >= 1) {
      result += "I";
      startingValue -= 1;
      continue;
    }
  }
  return result;
};

const Movie = () => {
  const params = useParams();
  const decodedParams = decodeURIComponent(params.id as string);

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { filmId: decodedParams },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const movie: MovieType = data.film;

  const episodeNumber = toRomanNumerals(movie.episodeID);

  return (
    <div className="text-center">
      <div className="sw-wrapper">
        <h4
          style={{ fontFamily: "star-wars" }}
          className="absolut h-0 overflow-visible scroll-text text-slate-50 text-md text-justify max-w-[400px] m-auto"
        >
          {movie.openingCrawl}
        </h4>
      </div>
      <br />
      {/* <h1 */}
      {/*   style={{ fontFamily: "star-wars" }} */}
      {/*   className="appear-txt text-yellow-400 font-bold text-4xl md:text-5xl max-w-[400px] m-auto" */}
      {/* > */}
      {/*   {movie.title.toLowerCase()} */}
      {/* </h1> */}
      {/* <br /> */}
      {/* Director: {movie.director} */}
      {/* <br /> */}
      {/* Release in {movie.releaseDate} */}
      {/* <br /> */}
      {/* <br /> */}
      {/* {movie.producers} */}
      <br />
      <div className="appear-txt mt-36 px-4 mx-auto max-w-3xl space-y-4">
        <div className="flex items-center space-4">
          <Link className="flex items-center space-2" href="/movies/">
            <ChevronLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to all movies</span>
          </Link>
        </div>
        <div className="grid gap-2">
          <h1
            style={{ fontFamily: "star-wars" }}
            className="appear-txt text-yellow-400 font-bold text-4xl md:text-5xl max-w-[400px] m-auto"
          >
            {movie.title.toLowerCase()}
          </h1>
          <p className="text-sm leading-none text-muted text-yellow-400 mb-1">
            Episode {episodeNumber}
          </p>
        </div>
        <div className="grid gap-4 md:gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <Image
                alt="The Empire Strikes Back"
                className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={600}
                src={getMovieImageByEpisode(movie.episodeID)}
                width={400}
              />
            </div>
            <div className="grid">
              <div>
                <h2 className="mb-2 text-xl mt-4 font-bold">Opening</h2>
                <p className="text-justify">{movie.openingCrawl}</p>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">
                  Additional Information
                </h2>
                <ul className="grid list-none p-0">
                  <li>
                    <strong>Release Date:</strong>{" "}
                    {new Date(movie.releaseDate).toDateString()}
                  </li>
                  <li>
                    <strong>Director:</strong> {movie.director}
                  </li>
                  <li>
                    <strong>Runtime:</strong>
                    124 minutes{"\n                              "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <h2 className="text-xl font-bold">Characters</h2>
                ...characters
              </div>
              <div className="grid gap-1">
                <h2 className="text-xl font-bold">Planets</h2>
                ...planest
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ChevronLeftIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default Movie;
