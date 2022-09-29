function Header({ children }) {
  return (
    <header className="header">
      <div className="logo"></div>
      {children}
    </header>
  );
}

export default Header;
