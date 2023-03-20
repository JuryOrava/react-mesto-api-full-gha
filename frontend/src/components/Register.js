import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header.js';

const Register = (props) => {
  
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const headerAction = {text: 'Войти', link: 'sign-in'};

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(formValue.password, formValue.email,);
  }

  return (
    <>
    <Header email={''} headerAction={headerAction}/>
    <div className="popup__container sign__container">
        <h3 className="popup__title sign__title">Регистрация</h3>
        <form onSubmit={handleSubmit} className="popup__form" noValidate>
            <label className="popup__input">
                <input placeholder="Email" className="popup__text sign__input" required id="email" name="email" type="text" value={formValue.email} onChange={handleChange} />
            </label>
            <label className="popup__input">    
                <input placeholder="Пароль" className="popup__text sign__input sign__input_password" required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} />
            </label>
            
            <button type="submit" className="popup__btn sign__btn">Зарегистрироваться</button>
        </form>
        <div className="">
          <p className="sign__title">Уже зарегистрированы? <Link to="/sign-in" className="sign__link">Войти</Link></p>
        </div>
    </div>
    </>
  );
}

export default Register;