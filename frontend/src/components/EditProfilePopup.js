import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDesc(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm submit={handleSubmit} btnText="Сохранить" title="Редактировать профиль" name="profile" inputTypeOne="text" inputTypeTwo="text" placeholderOne="Жак Ив Кусто" placeholderTwo="Исследователь океана" isOpen={props.isOpen} onClose={props.onClose} 
            children={
            <>
                <label className="popup__input">
                    <input onChange={handleChangeName} value={name || ""} type="text" id="profile-name-input" required minLength="2" maxLength="40" placeholder="Жак-Ив Кусто" className="popup__text popup__text_type_name popup__text_type_profile-name" />
                    <span className="popup__input-error profile-name-input-error"></span>
                </label>
                <label className="popup__input">
                    <input onChange={handleChangeDesc} value={description || ""} type="text" id="profile-descriptions-input" required minLength="2" maxLength="200" placeholder="Исследователь океана" className="popup__text popup__text_type_desc popup__text_type_profile-desc" />
                    <span className="popup__input-error profile-descriptions-input-error"></span>
                </label>
            </>
            } 
        />
    )
}

export default EditProfilePopup;