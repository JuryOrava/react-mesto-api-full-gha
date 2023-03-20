import React, {useState} from 'react';
import Header from './Header.js';

const Login = (props) => {

  const headerAction = {text: 'Регистрация', link: 'sign-up'};

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    props.onSubmit(formValue.password, formValue.email,);
    setFormValue({email: '', password: ''});
  }

  return (
    <>
    <Header email={''} headerAction={headerAction}/>
    <div className="popup__container sign__container">
        <h3 className="popup__title sign__title">Вход</h3>
        <form onSubmit={handleSubmit} className="popup__form" noValidate>
            <label className="popup__input">
                <input placeholder="Email" className="popup__text sign__input" required id="email" name="email" type="text" value={formValue.email} onChange={handleChange} />
            </label>
            <label className="popup__input">    
                <input placeholder="Пароль" className="popup__text sign__input sign__input_password" required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} />
            </label>
            <button type="submit" className="popup__btn sign__btn">Войти</button>
        </form>
    </div>
    </>
  )
}

export default Login;