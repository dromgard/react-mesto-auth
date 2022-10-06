import React from "react";
import { Route, Switch, Link } from "react-router-dom";

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
        <Switch>
          <Route exact path="/">
            <button
              onClick={handleInfoVisible}
              className={`header__burger-button ${
                infoVisible ? "header__burger-button_close" : ""
              }`}
            />
            <div className="header__info">
              <p className="header__email">{email}</p>
              <button
                onClick={handleLogout}
                className="header__nav-link header__nav-link_exit"
              >
                Выйти
              </button>
            </div>
          </Route>
          <Route path="/sign-up">
            <Link className="header__nav-link" to="sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__nav-link" to="sign-up">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
