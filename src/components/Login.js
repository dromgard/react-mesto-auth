import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  resetForm() {
    this.setState({ email: "", password: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(
      this.state.email,
      this.state.password,
      this.resetForm
    );
  }

  render() {
    return (
      <>
        <section className="sign">
          <form
            name="login"
            className="login__form"
            onSubmit={this.handleSubmit}
          >
            <h2 className="sign__title">Вход</h2>

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
              Войти
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default Login;
