import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardLike, onCardDelete, onCardClick, card }) {
  // Подписываемся на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Обработчики лайков, удаления карточки и просмотра увеличенного изображения.
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleCardClick() {
    onCardClick(card);
  }

  // Создаём переменную, в которую запишется "Корзина".
  const cardDeleteButton = isOwn ? (
    <button
      className="element__delete"
      type="button"
      aria-label="Удалить карточку из профиля"
      onClick={handleDeleteClick}
    ></button>
  ) : (
    ""
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем.
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка.
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>

      {cardDeleteButton}
    </article>
  );
}

export default Card;
