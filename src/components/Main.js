import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  /* Подписываемся на контекст текущего пользователя */
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      onCardClick={onCardClick}
    />
  ));

  return (
    <main className="content">
      {/* Блок profile */}
      <section className="profile">
        <div className="profile__common">
          {/* Аватар */}
          <div
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <div className="profile__avatar-overlay"></div>
          </div>

          {/* Данные профиля и редактирование */}
          <div className="profile__info">
            <div className="info">
              <h1 className="info__name">{currentUser.name}</h1>
              <p className="info__description">{currentUser.about}</p>
            </div>

            {/* Кнопка редактировать профиль */}
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        {/* Кнопка добавить место */}
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить запись"
          onClick={onAddPlace}
        ></button>
      </section>

      {/* Блок elements */}
      <section className="elements">{cardsElements}</section>
    </main>
  );
}

export default Main;
