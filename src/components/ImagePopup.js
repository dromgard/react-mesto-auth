import React from "react";

function ImagePopup({ onClose, card }) {
  return (
    <div
      className={`popup popup_previewed popup_type_image-preview${
        card.link ? " popup_opened" : ""
      }`}
    >
      <div className="popup__preview">
        <img src={card.link} alt={card.name} className="popup__image-preview" />
        <p className="popup__image-title">{card.name}</p>
        <button
          className="popup__close popup__close_type_image-preview"
          type="button"
          aria-label="Закрыть окно просмотра изображения"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
