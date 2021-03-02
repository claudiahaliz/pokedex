import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';
import { GET_POKEMONS } from '../../graphql/queries';
import pokeballGray from '../../assets/pokeball_gray.png';
import './styles.scss';

const Home = () => {
  const [buttonRef, setButtonRef] = useState(null);
  const observerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const gqlVariables = { limit: 24, offset };
  const {
    loading, error, data, fetchMore,
  } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  useEffect(() => {
    const options = {
      root: document.querySelector('#list'),
      threshold: 1,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        entry.target.click();
      }
    }, options);
  }, []);

  useEffect(() => {
    if (buttonRef) {
      observerRef.current.observe(document.querySelector('#buttonLoadMore'));
    }
  }, [buttonRef]);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const hasNextPage = data?.pokemons?.next !== null;

  const handleClick = () => {
    fetchMore({
      variables: {
        offset,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.pokemons.results = [
          ...prevResult.pokemons.results,
          ...fetchMoreResult.pokemons.results,
        ];
        return fetchMoreResult;
      },
    });
    setOffset(offset + 24);
  };

  return (
    <div className="result">
      <ul id="list">
        {
          data
            && data.pokemons
            && typeof data.pokemons.results !== 'undefined'
            && data.pokemons.results.map((element) => {
              const { image, name, id } = element;
              return (
                <Link to={`/detail/${name}`} key={id}>
                  <ListItem id={id} name={name} image={image} key={id} />
                </Link>
              );
            })
          }
      </ul>
      {(hasNextPage) && (
        <div
          role="button"
          tabIndex={0}
          className="loading-ball"
          ref={setButtonRef}
          id="buttonLoadMore"
          onClick={handleClick}
          onKeyDown={handleClick}
        >
          <img src={pokeballGray} alt="loading" className="loading__img" />
        </div>
      )}
    </div>
  );
};

export default Home;
