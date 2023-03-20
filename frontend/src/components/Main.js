import React from 'react';

import avaEdit from '../images/ava-edit.svg';
import editButton from '../images/Edit_Button.svg';
import add from '../images/add.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
    return (
      <>
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} src={currentUser.avatar} alt="Аватарка"/>
                    <img onClick={props.onEditAvatar} className="profile__edit-image" src={avaEdit} alt="Редактирование авы"/>
                    <div className="profile__descriptions">  
                        <div className="profile__name">
                            <h1 className="profile__name-text">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} type="button" className="profile__btn"><img className="profile__edit" src={editButton} alt="Редактировать профиль"/></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add"><img src={add} alt="Добавить фото" className="profile__add-img"/></button>
            </section>
            <section>
              <ul className="elements">
                {
                  props.cards.map((card) => {
                    return (<li key={card._id} className="elements__item">
                      <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} card={card} />
                    </li>)
                  })
                }
              </ul>    
            </section>
        </main>
      </>
    );
  }
  
  export default Main;



