import React from 'react';
import pt from 'prop-types';
import utils from '../../core/utils';

const ListItem = (props) => {
  const {
    id, name, image, nick,
  } = props;

  return (
    <li key={name} className="animate">
      <div className="item-pokemon__img">
        <img src={image} alt={name} />
      </div>
      <div className="item-pokemon__desc">
        <div className="id">
          {`# ${utils.padStartDigit(id)}`}
        </div>
        <div className="name">{nick ?? name}</div>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  id: pt.number,
  name: pt.string,
  image: pt.string,
  nick: pt.string,
};
export default ListItem;
