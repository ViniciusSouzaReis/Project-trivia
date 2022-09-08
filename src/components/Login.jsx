import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../Login.css';
import { userLoginAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      validationEmail: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { email } = this.state;
    const checkEmail = this.validEmail(email);
    this.setState((prevState) => ({
      email: prevState.email,
      name: prevState.name,
      validationEmail: checkEmail,
    }));
    userLogin(email, name);
  };

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  render() {
    const { email, name, validationEmail } = this.state;
    const { userLogin } = this.props;
    const checkPasswordLength = 0;
    const checkDisable = !validationEmail || name.length <= checkPasswordLength;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ checkDisable }
              onClick={ () => userLogin(email, name) }
            >
              Play
            </button>
          </Link>
          <Link to="/configuraçoes">
            <button type="button" data-testid="btn-settings"> Configurações</button>
          </Link>

        </header>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email, user) => dispatch(userLoginAction(email, user)),
});

export default connect(null, mapDispatchToProps)(Login);
