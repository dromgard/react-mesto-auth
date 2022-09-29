import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  // Обработчик отправки формы. Передаем значения инпутов.
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  // Очищаем поля инпутов при открытии попапа.
  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="element-name-input"
        type="text"
        placeholder="Название"
        name="name"
        className="popup__input popup__input_element_name"
        minLength="2"
        maxLength="30"
        ref={nameRef}
        required
      />
      <span className="popup__input-error element-name-input-error"></span>

      <input
        id="element-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_element_link"
        ref={linkRef}
        required
      />
      <span className="popup__input-error element-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
