import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Layout from './components/Layout';
import './index.css';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        results: {
          merge(existing, incoming) {
            let pokemons = [];
            if (existing && existing.pokemons) {
              pokemons = pokemons.concat(existing.pokemons);
            }
            if (incoming && incoming.launches) {
              pokemons = pokemons.concat(incoming.pokemons);
            }
            return {
              ...incoming,
              pokemons,
            };
          },
        },
      },
    },
  },
});
const link = new HttpLink({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
});
const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
