import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar({
          name,
          link,
        });
      }

    return (
        <PopupWithForm submit={handleSubmit} btnText="Создать" title="Новое место" name="place"  inputTypeOne="text" inputTypeTwo="url" placeholderOne="Название" placeholderTwo="Ссылка на картинку" isOpen={props.isOpen} onClose={props.onClose} 
        children={
          <>
            <label className="popup__input">
              <input onChange={handleChangeName} value={name} type="text" name="name" id="place-name-input" required minLength="2" maxLength="30" placeholder="Название" className="popup__text popup__text_type_name popup__text_type_place-name"/>
              <span className="popup__input-error place-name-input-error"></span>
            </label>
            <label className="popup__input">
              <input onChange={handleChangeLink} value={link} type="url" name="link" id="place-img-input" required placeholder="Ссылка на картинку" className="popup__text popup__text_type_desc popup__text_type_place-link"/>
              <span className="popup__input-error place-img-input-error"></span>
            </label>
          </>
          }
        />
    )
}

export default AddPlacePopup;