import React from 'react';
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from 'react-router-dom';
import NotFound from '../routes/NotFound';
import Home from '../routes/Home';
import Detail from '../routes/Detail';
import pokeballGray from '../assets/pokeball_gray.png';
import Pokemon from '../routes/Pokemon';
import '../styles/index.scss';

const Layout = () => (
  <div className="layout">
    <header>
      <Link to="/">
        <img
          src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png"
          alt="pokemon-logo"
        />
      </Link>
    </header>
    <div className="bottom-bar-container">
      <div className="bottom-bar">
        <NavLink
          to="/home"
          activeClassName="active-menu"
        >
          <div className="bottom-bar-item">
            <img src={pokeballGray} alt="pokedex" className="menu-img rotate" />
            <span>Pokedex</span>
          </div>
        </NavLink>
        <div />
        <NavLink to="/pokemon" activeClassName="active-menu">
          <div className="bottom-bar-item">
            <img src={pokeballGray} alt="pokemon" className="menu-img rotate" />
            <span>Pokemon</span>
          </div>
        </NavLink>
      </div>
    </div>
    <Switch>
      <Route exact path="/"><Redirect to="/home" /></Route>
      <Route path="/home" component={Home} />
      <Route path="/detail/:name" component={Detail} />
      <Route path="/pokemon/:uniqueId/:name" component={Detail} />
      <Route path="/pokemon" component={Pokemon} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);
export default Layout;
