import React from 'react';
import pt from 'prop-types';
import pokeballBw from '../../assets/pokeball_bw.png';
import pokeballColor from '../../assets/pokeball_color.jpg';
import './styles.scss';

const Fab = (props) => {
  const { onHandleAction, isRelease } = props;
  const img = isRelease ? pokeballBw : pokeballColor;
  const action = isRelease ? 'release' : 'catch';

  return (
    <button type="button" className="fab-wrapper" onClick={onHandleAction}>
      <div className="fab-wrapper-content">
        <img src={img} alt="gotta_catch_dem_all" />
        <p className={action}>{action}</p>
      </div>
    </button>
  );
};

Fab.propTypes = {
  onHandleAction: pt.func,
  isRelease: pt.bool,
};

export default Fab;
