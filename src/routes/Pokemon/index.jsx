import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ListItem from '../../components/ListItem';
import usePersistedState from '../../hooks/usePersistedState';
import './styles.scss';

const Pokemon = () => {
  const [owned] = usePersistedState('clpokedex-pokemonlist', []);
  const match = useRouteMatch();
  const ownedLen = owned.length;

  return (
    <div className="pokemon result">
      <h2 className="result-title">My Pokemon</h2>
      <h6>{`Showing list of ${ownedLen} item${ownedLen < 2 ? '' : 's'}`}</h6>
      {ownedLen === 0 && (
        <p className="center text">
          You have not caught any pokemons yet! Gotta catch&apos;em all!
        </p>
      )}
      <ul>
        {Array.isArray(owned) && ownedLen !== 0
          && (owned.map((el) => {
            const {
              id, pokemonName, image, nick, uniqueId,
            } = el;

            return (
              <Link to={`${match.url}/${uniqueId}/${pokemonName}`} key={uniqueId}>
                <ListItem
                  id={id}
                  name={pokemonName}
                  image={image}
                  nick={nick}
                />
              </Link>
            );
          }))}
      </ul>
    </div>

  );
};

export default Pokemon;
