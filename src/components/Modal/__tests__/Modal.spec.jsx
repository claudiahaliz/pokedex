import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../index';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Modal isVisible><p>Hello, this is modal</p></Modal>, div);
});
