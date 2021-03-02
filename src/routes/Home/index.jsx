import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';

import './styles.scss';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

const Home = () => {
  const gqlVariables = {
    limit: 20,
    offset: 0,
  };
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="result">
      <ul>
        {data.pokemons && typeof data.pokemons.results
          !== 'undefined' && data.pokemons.results.map((element) => {
          const { image, name, id } = element;
          return (
            <Link to={`/detail/${name}`} key={id}>
              <ListItem id={id} name={name} image={image} key={id} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
