import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../index';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotFound />, div);
});
it('shows correct image', async () => {
  const { getByAltText } = await render(<NotFound />);
  const image = getByAltText('psyduck');
  expect(image.src).toContain('psyduck');
});
