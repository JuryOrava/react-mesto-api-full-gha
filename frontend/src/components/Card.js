import React from 'react';

import deleteIcon from '../images/delete_icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import {renderLoading} from '../utils/utils.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let isOwn = props.card.owner._id === currentUser._id;

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `elements__btn ${isLiked && 'elements__btn_active'}` 
  );

function handleDeleteClick () {
  props.onCardDelete(props.card._id)
}
  
  return (
    <>
      {isOwn && 
        <button className='elements__delete' onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="Удалить карточку" className="elements__delete-img"/>
        </button>
      }
      <button type="button" className="elements__image-btn">
        <img onClick={handleClick} className="elements__image" style={{ backgroundImage: `url(${props.card.link})` }} src={props.card.link} alt={props.card.name}/>
      </button>
      <div className="elements__description">
        <h3 className="elements__title">{props.card.name}</h3>
        <div className="elements__like">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
          <p className="elements__like-length">{props.card.likes.length}</p>
        </div>
      </div>
    </>
  )
}
  
  export default Card;