import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";

function Header({ email, handleLogout }) {
  const [infoVisible, setInfoVisible] = React.useState(false);

  const handleInfoVisible = () => {
    setInfoVisible(!infoVisible);
  };

  // Проверка на логин при загрузке страницы.
  React.useEffect(() => {
    setInfoVisible(false);
  }, [email]);

  return (
    <header className="header">
      <div
        className={`header__info ${
          infoVisible ? "header__info_visible" : "header__info_invisible"
        }`}
      >
        <p className="header__email">{email}</p>
        <button
          onClick={handleLogout}
          className="header__nav-link header__nav-link_exit"
        >
          Выйти
        </button>
      </div>

      <div className="header__common">
        <div className="logo"></div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HeaderMenu
                handleInfoVisible={handleInfoVisible}
                infoVisible={infoVisible}
                email={email}
                handleLogout={handleLogout}
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link className="header__nav-link" to="/sign-in">
                Войти
              </Link>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Link className="header__nav-link" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;
