"use client";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useParams } from "next/navigation";
import React from "react";

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

const Movie = () => {
  const params = useParams();
  const decodedParams = decodeURIComponent(params.id as string);

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { filmId: decodedParams },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  const movie = data.film;

  return (
    <div>
      <h1>{movie.title}</h1>
      <br />
      Director: {movie.director}
      <br />
      Release in {movie.releaseDate}
      <br />
      {movie.openingCrawl}
      <br />
      {movie.producers}
      <br />
    </div>
  );
};

export default Movie;
