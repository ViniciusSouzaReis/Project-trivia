import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import Header from './Header';
import Trivia from './Trivia';
import logo from '../trivia.png';
import store from '../redux';
// import { removeToken } from '../services/saveToken';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      trivia: {},
    };
  }

  componentDidMount() {
    const state = store.getState();
    this.setState({ trivia: state.game.trivia }, () => {
      const { trivia } = this.state;
      const getReponseNumber = trivia.response_code;
      const magicNumber = 3;
      const { history } = this.props;
      if (getReponseNumber === magicNumber) {
        history.push('/');
        localStorage.removeItem('token');
      }
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div className="App">
        <img src={ logo } className="App-logo" alt="logo" />
        <Header />
        <Trivia history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};
