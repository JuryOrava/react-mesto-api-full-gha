import closeIcon from '../images/Close_Icon.svg';

function PopupWithForm(props) {
    const isOpenPopup = props.isOpen === true;
    return (
      <>
    <div className={`popup popup_${props.name} ${isOpenPopup && 'popup_opened'}`}>
      <div className={`popup__container ${props.containerStyle}`}>
        <h3 className="popup__title">{props.title}</h3>
        <button onClick={() => props.onClose()} type="button" className={`popup__close popup__close_${props.name}`}><img src={closeIcon} alt="Закрыть окно" className="popup__close-img"/></button>
        <form onSubmit={props.onSubmit} name={`${props.name}`} className={`popup__form popup__form_${props.name}`} noValidate>
            {props.children}
            <button onClick={props.submit} type="submit" className="popup__btn">{props.btnText}</button>
        </form>
      </div>
    </div>
    
    </>
    );
  }
  
  export default PopupWithForm;