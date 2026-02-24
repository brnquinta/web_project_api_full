import closeIcon from "../../../../images/close_icon.png";

function Popup({ title, children, onClose, isImagePopup }) {
  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose}>
        <div
          className={
            isImagePopup ? "popup__content_content_image" : "popup__content"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={
              isImagePopup
                ? "popup__close-c popup__close-button_image"
                : "popup__close-button"
            }
            onClick={onClose}
          >
            <img
              className="popup__close-icon"
              alt="icone de fechar"
              src={closeIcon}
            />
          </button>

          {isImagePopup ? null : <h2 className="popup__title">{title}</h2>}
         
          {children}


        </div>
      </div>
    </div>
  );
}

export default Popup;
