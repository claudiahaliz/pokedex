import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import './index.css';

const cache = new InMemoryCache();
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
