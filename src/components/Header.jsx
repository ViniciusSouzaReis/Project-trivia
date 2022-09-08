import React, { Component } from 'react';
import store from '../redux';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      hash: '',
    };
  }

  async componentDidMount() {
    const state = store.getState();
    const { user: { user, hash } } = state;
    this.setState({ user, hash });
  }

  render() {
    const { user, hash } = this.state;
    const urlHash = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ urlHash } alt="hashImage" />
        <p data-testid="header-player-name">{user}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}
