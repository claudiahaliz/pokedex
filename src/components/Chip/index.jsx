import React from 'react';
import pt, { number, string } from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const Chip = (props) => {
  const { type, children, itemNo } = props;

  const types = {
    normal: '#a4acaf',
    fighting: '#d56723',
    flying: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
    poison: '#b97fc9',
    ground: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    rock: '#a38c21',
    bug: '#729f3f',
    ghost: '#7b62a3',
    steel: '#9eb7b8',
    fire: '#fd7d24',
    water: '#4592c4',
    grass: '#9bcc50',
    electric: '#eed535',
    psychic: '#f366b9',
    ice: '#51c4e7',
    dragon: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    dark: '#707070',
    fairy: '#fdb9e9',
    unknown: '#68A090',
    shadow: '#705898',
  };
  const styleProp = type === 'flying' || type === 'ground' || type === 'dragon' ? 'background' : 'backgroundColor';

  return (<div className={cn('chip', type, { 'with-margin-left': itemNo !== 0 })} style={{ [styleProp]: types[type] }}>{children}</div>);
};

Chip.propTypes = {
  type: pt.string,
  children: string,
  itemNo: number,
};
Chip.defaultProps = {
  type: 'normal',
  children: '',
  itemNo: 0,
};

export default Chip;
