import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCard({ isOpen, onClose, onCardDelete }) {
  // Обработчик отправки формы. Передаем значения инпута.
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm-delete-element"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeleteCard;
