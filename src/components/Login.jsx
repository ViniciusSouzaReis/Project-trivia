import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import '../Login.css';
import { userLoginAction, getGameInfo } from '../redux/actions';
import { addToken } from '../services/saveToken';
import store from '../redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      triviaState: {},
      validationEmail: false,
    };
  }

  componentDidMount() {
    const state = store.getState();
    this.setState({ triviaState: state.game.trivia });
    const { triviaState } = this.state;
    console.log(triviaState);
  }

  componentDidUpdate(_, prevState) {
    store.subscribe(() => {
      const state = store.getState();
      const { game: { trivia } } = state;
      this.setState({ triviaState: trivia.response_code });
      const { triviaState } = this.state;
      if (prevState.triviaState !== triviaState) {
        this.checkRende();
      }
    });
  }

  // componentDidUpdate(_, prevState) {
  //   const newStore = store.subscribe();
  //   const { trivia } = this.state;
  //   if (prevState.trivia !== totalExpenses) {
  //     this.getTotalExpenses();
  //   }
  // }

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
  };

  handleClick = async () => {
    const { email, name } = this.state;
    const { dispatch, history } = this.props;
    const newHash = md5(email).toString();
    dispatch(userLoginAction(email, name, newHash));
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    const result = response.token;
    dispatch(getGameInfo(result));
    addToken(result);
    history.push('/game');
  };

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  checkRende() {
    const { triviaState } = this.state;
    console.log(triviaState);
  }

  render() {
    const { email, name, validationEmail } = this.state;
    // const { userLogin } = this.props;
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
          <button
            type="button"
            data-testid="btn-play"
            disabled={ checkDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <Link to="/configuracoes">
            <button type="button" data-testid="btn-settings"> Configurações</button>
          </Link>

        </header>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default connect()(Login);
