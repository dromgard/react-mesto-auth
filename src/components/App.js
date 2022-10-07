import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCard from "./ConfirmDeleteCard";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import authError from "../images/error.svg";
import regSuccess from "../images/success.svg";

function App() {
  // Создаем состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoMessagePopupOpen, setIsInfoMessagePopupOpen] =
    React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [resultMessage, setResultMessage] = React.useState({
    text: "",
    image: "",
  });
  const [cards, setCards] = React.useState([]);

  // Переменная состояния для хранения текущего пользователя.
  const [currentUser, setCurrentUser] = React.useState({});

  // Переменная состояния для хранения статуса входа.
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Переменная состояния для хранения email залогиненного пользователя.
  const [email, setEmail] = React.useState("");

  let navigate = useNavigate();

  // Проверяем наличие токена в локальном хранилище.
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`Переданный токен некорректен: ${err}`);
        });
    }
  };

  // Проверка на логин при загрузке страницы.
  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  // Получение и запись в стейты данных текущего пользователя и карточек.
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsInfo]) => {
        setCurrentUser(userData);
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных с сервера: ${err}`);
      });
  }, []);

  // Закрываем все попапы.
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoMessagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardToDelete({});
  };

  // Обработчик сохранения данных пользователя.
  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных пользователя: ${err}`);
      });
  }

  // Обработчик сохранения аватара пользователя.
  function handleUpdateAvatar({ avatar }) {
    api
      .updateUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`);
      });
  }

  // Обработчик добавления новой карточки.
  function handleAddPlace({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления новой карточки: ${err}`);
      });
  }

  // Обработчик лайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке.
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки.
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка проставления лайка: ${err}`);
      });
  }

  // Обработчик нажатия на кнопку удаления карточки. Открывает попап, записывает в стэйт карточку для удаления.
  function handleDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
  }

  // Обработчик удаления карточки.
  function handleCardDelete() {
    // Отправляем запрос в API и получаем обновлённые данные карточки.
    api
      .deleteCard(cardToDelete._id)
      .then((deleteCard) => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        setIsConfirmDeletePopupOpen(false);
        setCardToDelete({});
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  // Обработчик логина.
  const handleLogin = (userEmail, userPassword, resetLoginForm) => {
    if (!userEmail || !userPassword) {
      return;
    }
    auth
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/home");
          resetLoginForm();
        }
      })
      .catch((err) => {
        setResultMessage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: authError,
        });
        setIsInfoMessagePopupOpen(true);
        console.log(err);
      });
  };

  // Обработчик регистрации.
  const handleRegister = (userEmail, userPassword) => {
    auth
      .register(userPassword, userEmail)
      .then((res) => {
        setResultMessage({
          text: "Вы успешно зарегистрировались!",
          image: regSuccess,
        });
        navigate("/sign-in");
        console.log("Успех регистрации", res);
      })
      .catch((err) => {
        setResultMessage({
          text: "Что-то пошло не так!",
          image: authError,
        });
        console.log("Ошибка регистрации", err);
      })
      .finally(() => {
        setIsInfoMessagePopupOpen(true);
      });
  };

  // Открываем попап статуса.
  const handleInfoMessage = () => {
    setIsInfoMessagePopupOpen(true);
  };

  // Обрабатываем выход из аккаунта.
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={setSelectedCard}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          ></Route>

          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                onSuccess={handleInfoMessage}
                updateMessage={setResultMessage}
              />
            }
          ></Route>

          <Route
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          ></Route>
        </Routes>

        <Footer />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап добавления нового элемента */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        {/* Попап подтверждения удаления элемента */}
        <PopupWithForm
          title="Вы уверены?"
          name="confirm-delete-element"
          buttonText="Да"
          onClose={closeAllPopups}
        />

        {/* Попап изменения аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Попап подтверждения удаления */}
        <ConfirmDeleteCard
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        {/* Попап превью изображения элемента */}
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        {/* Попап информационного сообщения */}
        <InfoTooltip
          isOpen={isInfoMessagePopupOpen}
          onClose={closeAllPopups}
          resultMessage={resultMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
