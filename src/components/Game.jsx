import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import Header from './Header';
import Trivia from './Trivia';
import logo from '../trivia.png';
// import store from '../redux';
// import { removeToken } from '../services/saveToken';

export default class Game extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     trivia: {},
  //   };
  // }

  // componentDidMount() {
  //   const state = store.getState();
  //   this.setState({ trivia: state.game.trivia });
  // }

  render() {
    const { history } = this.props;
    // const { trivia } = this.state;
    // const checkTrivia = trivia.response_code;
    // const checkNumber = 0;
    return (
      <div className="App">
        <img src={ logo } className="App-logo" alt="logo" />
        <Header />
        <Trivia history={ history } />
        {/* {checkTrivia === checkNumber
          ? <Redirect to="/" />
          : <Trivia history={ history } />} */}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};
