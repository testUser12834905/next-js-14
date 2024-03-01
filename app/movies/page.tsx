"use client";
import { getClient } from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";

const GET_ALL_FILMS = gql`
  query GetAllFilms {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`;

const Movies = () => {
  // const client = getClient();
  // const { data } = await client.query({
  //   query: GET_ALL_FILMS,
  // });
  //
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const films: Record<string, string>[] = data?.allFilms?.films;

  console.log("films", films);

  return films.map(({ id, title }) => (
    <div key={id}>
      <h2>{title}</h2>
      <Link href={`movies/${id}/`}>
        <h4>{id}</h4>
      </Link>
      <br />
      <br />
    </div>
  ));
};

export default Movies;
