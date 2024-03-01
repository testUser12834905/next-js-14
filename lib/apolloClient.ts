import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  credentials: "same-origin",
});

const createApolloClient = (ssrMode: boolean) =>
  new ApolloClient({
    link: httpLink,
    ssrMode: ssrMode,
    cache: new InMemoryCache(),
  });

export default createApolloClient;
