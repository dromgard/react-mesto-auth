import React from "react";

function HeaderMenu({ handleInfoVisible, infoVisible, email, handleLogout }) {
  return (
    <>
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
    </>
  );
}

export default HeaderMenu;
