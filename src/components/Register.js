import React from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleRegister(this.state.email, this.state.password);
  }

  render() {
    return (
      <>
        <section className="sign">
          <form
            name="register"
            className="login__form"
            onSubmit={this.handleSubmit}
          >
            <h2 className="sign__title">Регистрация</h2>

            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              className="sign__input"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              name="password"
              className="sign__input"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <button
              name="submit"
              className="sign__submit"
              type="submit"
              aria-label="Войти"
            >
              Зарегистрироваться
            </button>
            <p className="sign__text">
              Уже зарегистрированы?
              <Link to="/sign-in" className="sign__link">
                {" "}
                Войти
              </Link>
            </p>
          </form>
        </section>
      </>
    );
  }
}

export default Register;
