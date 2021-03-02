import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import pokeballColor from '../../../assets/pokeball_color.jpg';
import ListItem from '../index';

// const props = {
//   id, name, image, nick,
// };
it('should render nick when name is empty', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListItem id={30} name="psyduck" image={pokeballColor} nick="psyduuuck" />, div);
});
it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListItem id={30} name="psyduck" image={pokeballColor} />, div);
});
it('uses correct release src', async () => {
  const { getByAltText } = await render(<ListItem id={30} name="psyduck" image={pokeballColor} nick="psyduuuck" />);
  const image = getByAltText('psyduck');
  expect(image.src).toContain(pokeballColor);
});
