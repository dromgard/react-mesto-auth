import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
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
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
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

  let history = useHistory();

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
            history.push("/");
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
    setSelectedCard({ name: "", link: "" });
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

  // Обработчик удаления карточки.
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки.
    api
      .deleteCard(card._id)
      .then((deleteCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
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
          history.push("/home");
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
        history.push("/sign-in");
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
    history.push("/sign-in");
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} handleLogout={handleLogout} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              onSuccess={handleInfoMessage}
              updateMessage={setResultMessage}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

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
