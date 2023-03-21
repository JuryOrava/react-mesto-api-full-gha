import React from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Api from '../utils/api.js';
import Register from './Register';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth.js';
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from './InfoTooltip.js';

const api = new Api({
  baseUrl: 'https://api.juryjo-mesto.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  },
});


function App() {

  const [currentUser, setСurrentUser] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  
  const headerAction = {text: 'Выйти', link: 'sign-in'};
  const navigate = useNavigate();

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = React.useState(false);

  function handleInfoTooltipPopupOpened () {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen)
  }

  function closeInfoTooltipPopup () {
    setIsInfoTooltipPopupOpen(false);
    if(isInfoTooltipPopup !== false) {
      navigate('/sign-in');
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.checkToken(token)
      .then((res) => {
        if (res){
          setEmail(res.data.email)
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }
  
  const handleExit = () => {
    setLoggedIn(false);
  }

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    
    .then((values)=>{
      setСurrentUser(values[0]);
      setCards(values[1])
    })
    .catch((err)=>{
      console.log(err);
    });
  }, []);

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCard(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  
  function handleCardDelete(id) {
    api.deleteCard(id)
    .then(() => {
      setCards(cards.filter((card) => card._id !== id))
    })
    .catch((err) => {
      console.log(err);
    })
    /*.finally(() => {
      renderLoading(false, popup, btn, text)
    });
    renderLoading(true, popup, btn, text);*/
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
    .then((res) => {
      setСurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    /*.finally(() => {
      renderLoading(false, popup, btn, text)
    });
    renderLoading(true, popup, btn, text)*/
  }

  function handleAvatarUser(obj) {
    api.editProfileAvatar(obj)
    .then((res) => {
      setСurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    /*.finally(() => {
      renderLoading(false, popup, btn, text)
    });
    renderLoading(true, popup, btn, text)*/
  }

  function handleAddPlace(card) {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    /*.finally(() => {
      renderLoading(false, popup, btn, text)
    });
    renderLoading(true, popup, btn, text)*/
  }

  const handleSubmitRegister = (password, email) => {
      auth.register(password, email)
      .then((res) => {
        if(res.data) {
          setIsInfoTooltipPopup(true);
        }
        handleInfoTooltipPopupOpened();
        }
      )
      .catch((err) => {
        if(err) {
          setIsInfoTooltipPopup(false);
          console.log(err);
        }
        handleInfoTooltipPopupOpened();
      }
    );
  }


const handleSubmitLogin = (password, email) => {   
  auth.authorize(password, email)
  .then((data) => {
    if (data.token){
      handleLogin();
      navigate('/', {replace: true});
    }
    if (data.token){
    localStorage.setItem('token', data.token);
    return data;
    }
  })
  .catch(err => console.log(err));
}

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    {loggedIn && <Header handleExit={handleExit} email={email} headerAction={headerAction}/>}
      <Routes>
        <Route path="/" 
          element={<ProtectedRoute 
            element={<Main
              onCardDelete={handleCardDelete} 
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardClick={handleCardClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
            />}
          loggedIn={loggedIn}
          />} 
        />
        <Route path="/sign-up" element={<Register onSubmit={handleSubmitRegister}/>} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} onSubmit={handleSubmitLogin}/>} />
        <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
      {loggedIn && <Footer />}
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleAvatarUser} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup onUpdateAvatar={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      
      <PopupWithForm title="Вы уверены?" name="del-place"  inputTypeOne="text" placeholderOne="id" containerStyle="popup__container_del-place" inputStyle="popup__none-input" isOpen="{isOpen}"
        children={
          <>
            <input type="text" name="id" id="id" placeholder="id" className="popup__text popup__none-input"/>
            <button type="submit" className="popup__btn popup__btn-place">Да</button>
          </>
          }
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      <InfoTooltip status={isInfoTooltipPopup} isOpen={isInfoTooltipPopupOpen} onClose={closeInfoTooltipPopup}/>
    </div>
    </CurrentUserContext.Provider>
  </>
  );
}

export default App;
