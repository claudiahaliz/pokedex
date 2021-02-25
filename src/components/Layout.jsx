import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import NotFound from '../routes/NotFound';
import Home from '../routes/Home';
import Detail from '../routes/Detail';
import pokeballGray from '../assets/pokeball_gray.png';
import pokeballColor from '../assets/pokeball_color.png';
import './styles.scss';

const Layout = () => (
  <div className="layout">
    <header>
      <img
        src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png"
        alt="pokemon-logo"
      />
    </header>
    <div className="bottom-bar">
      <Link to="/">
        <div className="bottom-bar-item">
          <img src={pokeballGray} alt="pokedex" />
          <span>Pokedex</span>
        </div>
      </Link>
      <Link to="/rowlet">
        <div className="bottom-bar-item">
          <img src={pokeballColor} alt="pokemon" />
          <span>Pokemon</span>
        </div>
      </Link>
    </div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:name" component={Detail} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);
export default Layout;
