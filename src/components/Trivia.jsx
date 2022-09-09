import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux';
// import { removeToken } from '../services/saveToken';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivia: { },
      counter: 0,
    };
  }

  componentDidMount() {
    const state = store.getState();
    this.setState({ trivia: state.game.trivia });
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect()(Trivia);
