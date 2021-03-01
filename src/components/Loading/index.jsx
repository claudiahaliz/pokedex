import React from 'react';
import pokeballGray from '../../assets/pokeball_gray.png';
import './styles.scss';

const Loading = () => (
  <div className="loading">
    <img src={pokeballGray} alt="loading" className="loading__img" />
  </div>
);

export default Loading;
