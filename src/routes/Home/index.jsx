import React from 'react';
import {
  Link, useRouteMatch,
} from 'react-router-dom';
import {
  gql,
  useQuery,
} from '@apollo/client';
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
      }
    }
  }
`;

const gqlVariables = {
  limit: 10,
  offset: 0,
};

const Home = () => {
  const {
    loading, error,
    data,
  } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const match = useRouteMatch();

  return (
    <div className="result">
      <ul>
        {data && data.pokemons.results.map(({ image, name }) => (

          <Link to={`${match.url}${name}`}>
            <li key={name}>
              <img src={image} alt={name} />
              <p>
                {name}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>

  );
};

export default Home;
