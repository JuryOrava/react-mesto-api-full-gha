import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const counterRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: counterRef.current.value,
        });
      }

    return (
        <PopupWithForm submit={handleSubmit} btnText="Сохранить" title="Обновить аватар" name="profile-foto"  inputTypeOne="url" placeholderOne="Ссылка" containerStyle="popup__container_profile-foto" isOpen={props.isOpen} onClose={props.onClose} 
        children={
          <>
            <label className="popup__input">
              <input ref={counterRef} type="url" name="link" id="place-ava-input" required placeholder="Ссылка на картинку" className="popup__text popup__text_type_desc popup__text_type_place-link"/>
              <span className="popup__input-error place-img-input-error"></span>
            </label>
          </>
          } 
        />
    )
}

export default EditAvatarPopup;