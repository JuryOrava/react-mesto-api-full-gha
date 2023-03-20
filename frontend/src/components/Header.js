import logo from '../images/logo.svg';
import {Link, useNavigate} from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  function signOut(){
    if (localStorage.getItem('token')){
      localStorage.removeItem('token');
      navigate("/sign-in");
      props.handleExit();
    }
  }
    return (
      <>
        <header className="header">
          <a href="#"><img className="logo" alt="Логотип" src={logo}/></a>
          <div className="header__info">
            <p className="header__email">{props.email}</p>
            <Link onClick={signOut} to={`/${props.headerAction.link}`} className="header__action">{props.headerAction.text}</Link>
          </div>
        </header>
    </>
    );
  }
  
  export default Header;