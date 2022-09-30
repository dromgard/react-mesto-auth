import React from "react";

function InfoTooltip({ onClose, isOpen, resultMessage }) {
  return (
    <div className={`popup popup_previewed ${isOpen ? " popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          src={resultMessage.image}
          alt={resultMessage.text}
          className="popup__info-image"
        />
        <h2 className="popup__title popup__title_info-message">
          {resultMessage.text}
        </h2>

        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
