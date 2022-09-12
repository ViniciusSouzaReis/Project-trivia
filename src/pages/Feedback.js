import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../redux';

export default class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      hash: '',
      score: 0,
      message: '',
      assertions: 0,
    };
  }

  componentDidMount() {
    const state = store.getState();
    const { player: { score, assertions } } = state;
    const { user: { user, hash } } = state;
    this.setState({ user, hash, score, assertions });
    const THREE = 3;
    if (assertions < THREE) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { user, hash, score, message, assertions } = this.state;
    const urlHash = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <div data-testid="feedback-text">Feedback</div>
        <img data-testid="header-profile-picture" src={ urlHash } alt="hashImage" />
        <div data-testid="header-player-name">{user}</div>
        <div data-testid="header-score">{score}</div>
        <div data-testid="feedback-text">{message}</div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.func.isRequired,
};
