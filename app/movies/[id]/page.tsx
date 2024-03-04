"use client";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useParams } from "next/navigation";
import React from "react";
import { FilmType } from "../page";

type Props = {};

const GET_MOVIE_BY_ID = gql`
  query GetMovie($filmId: ID!) {
    film(id: $filmId) {
      id
      title
      director
      openingCrawl
      releaseDate
      producers
    }
  }
`;

type MovieType = FilmType & { openingCrawl: string };

const Movie = () => {
  const params = useParams();
  const decodedParams = decodeURIComponent(params.id as string);

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { filmId: decodedParams },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const movie: MovieType = data.film;

  return (
    <div className="text-center">
      <br />
      <div className="sw-wrapper">
        <h4
          style={{ fontFamily: "star-wars" }}
          className="scroll-text text-slate-50 text-md text-justify max-w-[400px] m-auto"
        >
          {movie.openingCrawl}
        </h4>
      </div>
      <br />
      <h1
        style={{ fontFamily: "star-wars" }}
        className="appear-txt text-yellow-400 font-bold text-4xl md:text-5xl max-w-[400px] m-auto"
      >
        {movie.title.toLowerCase()}
      </h1>
      <br />
      Director: {movie.director}
      <br />
      Release in {movie.releaseDate}
      <br />
      <br />
      {movie.producers}
      <br />
    </div>
  );
};

export default Movie;
