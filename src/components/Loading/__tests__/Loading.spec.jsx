import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import pokeballGray from '../../../assets/pokeball_gray.png';
import Loading from '../index';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loading />, div);
});
it('shows correct image', async () => {
  const { getByAltText } = await render(<Loading />);
  const image = getByAltText('loading');
  expect(image.src).toContain(pokeballGray);
});
