import React from 'react';
import ReactDOM from 'react-dom';
import Chip from '../index';

it('should render regular chip', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chip type="fire" itemNo={3}>Fire</Chip>, div);
});
it('should render other chips', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chip type="ground" itemNo={1}>Ground</Chip>, div);
});
