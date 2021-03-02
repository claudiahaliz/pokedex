import React from 'react';
import pt from 'prop-types';
import cn from 'classnames';
import './styles.scss';

const Modal = (props) => {
  const { children, isVisible } = props;

  return (
    <div className={cn('modal', { hidden: !isVisible })}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: pt.oneOfType([pt.instanceOf(Array), pt.object]),
  isVisible: pt.bool,
};
Modal.defaultProps = {
  children: [],
  isVisible: false,
};

export default Modal;
