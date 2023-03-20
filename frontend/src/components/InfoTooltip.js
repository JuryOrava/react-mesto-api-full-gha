import closeIcon from '../images/Close_Icon.svg';
import failIcon from '../images/fail.svg';
import successIcon from '../images/success.svg';

const failText = 'Что-то пошло не так! Попробуйте ещё раз.';
const successText = 'Вы успешно зарегистрировались!';

function InfoTooltip(props) {
    const isOpenPopup = props.isOpen === true;
    return (
        <div className={`popup popup_${props.name} ${isOpenPopup && 'popup_opened'}`}>
            <div className="popup__container popup__container_status">
                <img src={props.status ? successIcon : failIcon} alt="Закрыть окно" className="popup__status-img"/>
                <h3 className="popup__status-text">{props.status ? successText : failText}</h3>
                <button onClick={() => props.onClose()} type="button" className={`popup__close popup__close_${props.name}`}><img src={closeIcon} alt="Закрыть окно" className="popup__close-img"/></button>
            </div>
        </div>
    );
  }
  
export default InfoTooltip;