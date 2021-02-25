import React from 'react';
import './styles.scss';

const NotFound = () => (
  <div className="not-found">
    <p className="not-found-text">Page not found</p>
    <img
      src="https://assets.pokemon.com/static2/_ui/img/global/psyduck.png"
      className="not-found-img"
      alt="psyduck"
    />
  </div>
);

export default NotFound;
