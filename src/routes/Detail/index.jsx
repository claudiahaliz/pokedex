import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Chip from '../../components/Chip';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import Fab from '../../components/Fab';
import iconEdit from '../../assets/icon_edit.svg';

import utils from '../../core/utils';
import usePersistedState from '../../hooks/usePersistedState';
import { GET_POKEMON_DETAIL, GET_POKEMON_DETAIL_OWN } from '../../graphql/queries';

import './styles.scss';

const { toPascalCase, getUniqueId } = utils;

const Detail = () => {
  const [owned, setOwned] = usePersistedState('clpokedex-pokemonlist', []);
  const { name: paramName, uniqueId } = useParams();

  const [dataObj, setDataObj] = useState({});
  const [isMyPokemon, setMyPokemon] = useState(false);
  const [query, setQuery] = useState(GET_POKEMON_DETAIL);

  const [isModalVisible, setIsModalVisible] = useState(false); // show modal
  const [isAskPermission, setIsAskPermission] = useState(false); // text ask permission
  const [isLoadingAction, setLoadingAction] = useState(false); // loading state
  const [isCaught, setIsCaught] = useState(false); // success catch pokemon
  const [isRedirect, setRedirect] = useState(false); // redirect to /pokemon

  const [isSuccess, setSuccess] = useState(false); // editing nick
  const [inputVal, setInputVal] = useState(''); // input value for nick

  // useEffects
  useEffect(() => {
    if (uniqueId) {
      setMyPokemon(true);
      setQuery(GET_POKEMON_DETAIL_OWN);
      const obj = owned.find((el) => el.uniqueId === uniqueId);
      if (Object.keys(obj).length !== 0) {
        setInputVal(JSON.parse(JSON.stringify(obj.nick)));
        setDataObj(obj);
      }
    }
  }, []);

  // redirect to /pokemon
  useEffect(() => {
    let timer;
    if (isModalVisible && isSuccess) {
      timer = setTimeout(() => setRedirect(true), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isModalVisible, isSuccess]);

  const gqlVariables = { name: paramName };
  const { loading, error, data } = useQuery(query, {
    variables: gqlVariables,
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  // destructure; must be here after data arrives
  if (data.pokemon.name === null) {
    return <Redirect to="/not-found" />;
  }
  const {
    id,
    sprites: {
      front_default: profileImg,
    },
    types,
    abilities,
    stats,
    moves,
    height,
    weight,
    held_items: heldItemsData,
    base_experience: baseXP,
  } = data.pokemon;
  const hasAbility = abilities.length !== 0;
  const heldItems = Array.isArray(heldItemsData) && heldItemsData.length !== 0;

  // functions

  // close modal
  const handleCloseModal = () => setIsModalVisible(false);

  // handle input change
  const handleChangeInput = (e) => {
    const val = e.target.value;
    setInputVal(val);
  };

  const handleCatch = () => {
    setLoadingAction(false);
    const randomNum = Math.floor((Math.random() * 2) + 1);

    if (randomNum === 1) {
      setIsCaught(true);
    } else if (isCaught) {
      setIsCaught(false);
    }
  };

  // ask permission
  const askPermission = () => {
    setIsCaught(false);
    setLoadingAction(false);
    setIsAskPermission(true);
    setIsModalVisible(true);
  };

  // loading action
  const handleCatching = () => {
    setInputVal('');
    setIsAskPermission(false);
    setLoadingAction(true);
    setTimeout(() => {
      setLoadingAction(false);
      handleCatch();
    }, 2000);
  };

  // catch success; add to my pokemon
  const handleSavePokemon = (e) => {
    e.preventDefault();
    const nick = inputVal;
    setOwned([...owned, {
      pokemonName: paramName,
      id,
      image: profileImg,
      nick: nick !== '' ? nick : paramName,
      uniqueId: getUniqueId(),
    }]);
    setIsCaught(false);
    setSuccess(true);
  };

  // release pokemon
  const handleRelease = () => {
    // set persisted state
    if (owned.length !== 0) {
      const index = owned.findIndex((el) => el.uniqueId === uniqueId);
      const newOwned = JSON.parse(JSON.stringify(owned));
      newOwned.splice(index, 1);
      setOwned(newOwned);
    }

    setIsAskPermission(false);
    setLoadingAction(true);
    setSuccess(true);
  };

  // edit nickname
  const handleEdit = () => {
    setLoadingAction(false);
    setIsAskPermission(false);
    setIsCaught(true);
    setIsModalVisible(true);
  };

  // submit edit nickname
  const submitEdit = (e) => {
    e.preventDefault();
    const nick = inputVal;

    // if nick is empty, set name to inputVal
    setInputVal(nick === '' ? paramName : nick);

    // set persisted state
    const index = owned.findIndex((el) => el.uniqueId === uniqueId);
    const newOwned = JSON.parse(JSON.stringify(owned));
    const newDataObj = JSON.parse(JSON.stringify(dataObj));
    newOwned.splice(index, 1);
    newDataObj.nick = nick;
    setOwned([...newOwned, newDataObj]);

    // next steps
    setIsCaught(false);
    setSuccess(true);
  };

  const handleAskPermission = () => askPermission();

  // end of functions

  return (
    <div className="detail">
      {isRedirect && <Redirect to="/pokemon" />}
      <Modal isVisible={isModalVisible}>
        {isSuccess && !isLoadingAction && <p className="center">Success!</p>}
        {isLoadingAction && !isMyPokemon && (
          <p className="center">
            Catching...
          </p>
        )}
        {isSuccess && isLoadingAction && (
        <p className="center">
          Bye-bye
            {' '}
            {dataObj.nick}
          !
        </p>
        )}
        {isAskPermission && (
          <div>
            <h3 className="modal__title">
              {`${isMyPokemon ? 'Release' : 'Catch'} this pokemon?`}
            </h3>
            <div className="button-container">
              <button
                type="button"
                onClick={handleCloseModal}
                className="button-item"
              >
                Cancel
              </button>
              <button
                className="button-item positive"
                type="button"
                onClick={isMyPokemon ? handleRelease : handleCatching}
              >
                Yes
              </button>
            </div>
          </div>
        )}
        {(isCaught) && (
          <>
            <h4 htmlFor="firstName" className="modal__title">
              {!isMyPokemon && `You've just caught a ${toPascalCase(paramName)}!`}
              {!isMyPokemon && <br />}
              Give a nickname:
              <br />
            </h4>
            <input
              className="modal__input"
              type="text"
              id="first-name"
              name="nick"
              maxLength={18}
              value={inputVal}
              onChange={handleChangeInput}
            />
            <div className="button-container">

              <button
                type="button"
                onClick={handleCloseModal}
                className="button-item"
              >
                Cancel
              </button>
              <button
                className="button-item positive"
                type="button"
                onClick={isMyPokemon ? submitEdit : handleSavePokemon}
              >
                Save
              </button>
            </div>
          </>
        )}
        {((!isLoadingAction && !isCaught && !isAskPermission && !isSuccess)) && (
          <div>
            <h3 className="modal__title">{`${toPascalCase(paramName)} ran away...`}</h3>
            <div className="button-container">
              <button
                type="button"
                onClick={handleCloseModal}
                className="button-item"
              >
                Back
              </button>
              <button
                className="button-item positive"
                type="button"
                onClick={handleCatching}
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </Modal>

      <p className="detail-id">{` #${utils.padStartDigit(id)}`}</p>
      <div className="detail-header">
        <div className="title">
          {isMyPokemon ? dataObj.nick : toPascalCase(paramName)}

          {isMyPokemon && (
            <div
              role="button"
              className="edit"
              onClick={handleEdit}
              onKeyPress={handleEdit}
              tabIndex={0}
            >
              <img src={iconEdit} alt="icon_edit" className="icon-edit" />
            </div>
          )}

        </div>
      </div>

      {/* types */}
      <section className="types types-wrapper">
        {types.length !== 0 && types.map((el, key) => (
          <Chip itemNo={key} type={el.type.name} key={`chip-${el.type.name}`}>{el.type.name}</Chip>
        ))}
      </section>

      {/* image */}
      <section className="profile-img">
        <img src={profileImg} alt={`img_${paramName}`} />
      </section>

      {/* info */}
      <section className="detail__desc">

        <div className="info card">
          {hasAbility && (
          <div className="card-item">
            <div className="card-item__val">{toPascalCase(abilities[0].ability.name)}</div>
            <div className="card-item__title">Ability</div>
          </div>
          )}
          <div className={cn('card-item with-right-separator',
            { 'with-left-separator': hasAbility || heldItems })}
          >
            <div className="card-item__val">
              {weight}
              <span> lbs</span>
            </div>
            <div className="card-item__title">Weight</div>
          </div>
          <div className="card-item">
            <div className="card-item__val">
              {height}
              <span> in</span>
            </div>
            <div className="card-item__title">Height</div>
          </div>
        </div>
        {isMyPokemon && (
          <div className="info card with-border-top">
            {heldItems && (
            <div className="card-item">
              <div className="card-item__val">{toPascalCase(heldItemsData[0].item.name)}</div>
              <div className="card-item__title">Held Item</div>
            </div>
            )}
            <div className={cn('card-item', { 'with-left-separator': heldItems })}>
              <div className="card-item__val">
                {baseXP}
              </div>
              <div className="card-item__title">Base XP</div>
            </div>
          </div>
        )}

        {/* stats */}
        <section className="stats">
          <p className="section-title">Stats</p>
          <hr />
          {stats.length !== 0 && (
          <div className="stats-list">
            {stats.map((el) => (
              <div className="stat-item" key={`stat-${el.stat.name}`}>
                <span className="stat-item__title">{toPascalCase(el.stat.name)}</span>
                <span className="stat-item__num">{el.base_stat}</span>
              </div>
            ))}
          </div>
          )}
        </section>

        {/* moves */}
        <section className="moves">
          <p className="section-title">Moves</p>
          <hr />
          <ul className="moves-list">
            {moves.length !== 0 && moves.map((el) => (
              <li
                className="moves-item"
                key={`move-${el.move.name}`}
              >
                {toPascalCase(el.move.name)}

              </li>
            ))}
          </ul>
        </section>

      </section>

      {/* Button to catch / release */}
      <Fab isRelease={isMyPokemon} onHandleAction={handleAskPermission} />

    </div>
  );
};
export default Detail;
