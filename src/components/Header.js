import React from "react";
import { Route, Switch, Link } from "react-router-dom";

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <div className="logo"></div>
      <Switch>
        <Route exact path="/">
          <div className="header__info">
            {email}
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
    </header>
  );
}

export default Header;
