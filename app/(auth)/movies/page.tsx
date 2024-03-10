"use client";
import { getClient } from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { MovieCard } from "./_components/movie-card";

const GET_ALL_FILMS = gql`
  query GetAllFilms {
    allFilms {
      films {
        id
        title
        director
        producers
        releaseDate
      }
    }
  }
`;

export type FilmType = {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  producers: string[];
};

const Movies = () => {
  // NOTE:attempt to make it workd server side, kept here for reference
  // const client = getClient();
  // const { data } = await client.query({
  //   query: GET_ALL_FILMS,
  // });
  //
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const films: FilmType[] = data?.allFilms?.films;

  console.log("films", films);

  return (
    <div>
      <div className="text-center py-10">
        <h1
          style={{ fontFamily: "star-wars" }}
          className="text-yellow-400 font-bold text-5xl md:text-6xl tracking-widest"
        >
          STar waRS
        </h1>
        <p
          style={{ fontFamily: "star-wars" }}
          className="text-yellow-300 text-xl md:text-2xl mt-4"
        >
          movies
        </p>
      </div>

      <br />
      {films.map(({ id, title, director, producers, releaseDate }) => (
        <div className="flex items-center justify-center" key={id}>
          <br />
          <MovieCard
            id={id}
            title={title}
            director={director}
            producers={producers}
            releaseDate={releaseDate}
          />
        </div>
      ))}
    </div>
  );
};

export default Movies;
