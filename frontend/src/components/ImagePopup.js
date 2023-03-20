import closeIcon from '../images/Close_Icon.svg';

function ImagePopup(props) {
    //const popup = document.querySelector('.popup_place-image');
    const isOpenPopup = props.isOpen === true;
    return (
        <div className={`popup popup_place-image ${isOpenPopup && 'popup_opened'}`}>
            <div className="popup__place-container">
                <button onClick={() => props.onClose(/*popup*/)} type="button" className="popup__close popup__close_place-image"><img src={closeIcon} alt="Закрыть окно" className="popup__close-img"/></button>
                <img style={{ backgroundImage: `url(${props.card.link})` }} src={props.card.link} alt={props.card.name} className="popup__place-img"/>
                <p className="popup__place-name">{props.card.name}</p>
            </div>
        </div>
    );
  }
  
  export default ImagePopup;


