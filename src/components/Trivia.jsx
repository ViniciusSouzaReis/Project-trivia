import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux';
import '../trivia.css';

let clock;

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivia: [],
      counter: 0,
      array: [],
      wrong: '',
      correct: '',
      disabled: false,
      time: 30,
    };
  }

  componentDidMount() {
    const state = store.getState();
    const { counter } = this.state;
    this.setState({
      trivia: state.game.trivia.results,
      array: [state.game.trivia.results[counter].correct_answer,
        ...state.game.trivia.results[counter].incorrect_answers],
    });
    this.Clock();
  }

  handleClick = () => {
    const { counter } = this.state;
    const NUMBER_FOUR = 4;
    if (counter < NUMBER_FOUR) {
      this.setState((estadoAnterior) => ({
        counter: estadoAnterior.counter + 1,
      }));
    }
    this.Clock();
  };

  Clock = () => {
    const ONE_SECOND = 1000;
    clock = setInterval(() => {
      this.setState((prev) => ({
        time: prev.time - 1,
        disabled: false,
      }));
    }, ONE_SECOND);
    this.breakClock(clock);
  };

  breakClock = (param) => {
    const THIRTY_SECOND = 30000;
    setTimeout(() => {
      clearInterval(param);
      this.setState({
        disabled: true,
        time: 30,
      });
    }, THIRTY_SECOND);
  };

  answersFunction = () => {
    clearInterval(clock);
    this.setState({
      wrong: 'wrong-answer-css ',
      correct: 'correct-answer-css',
      disabled: true,
    });
  };

  render() {
    const { trivia, counter, array, wrong, correct, disabled, time } = this.state;
    const ZERO_FIVE = 0.5;
    const ONE = 1;
    const array2 = array.map((e, index) => {
      if (index === 0) {
        return {
          resposta: e,
          valor: true,
        };
      }
      return {
        reposta: e,
        valor: false,
      };
    });
    array2.sort(() => ((Math.random() > ZERO_FIVE) ? ONE : -ONE));
    return (
      <div>
        {(trivia.length !== 0
                && (
                  <div>
                    <p data-testid="question-category">{trivia[counter].category}</p>
                    <p data-testid="question-text">{trivia[counter].question}</p>
                    <span>{ time }</span>
                    <section data-testid="answer-options">
                      {array2.map((e, index) => (
                        e.valor === true ? (
                          <button
                            type="button"
                            className={ correct }
                            data-testid="correct-answer"
                            disabled={ disabled }
                            onClick={ this.answersFunction }
                            key={ 5 }
                          >
                            {e.resposta}
                          </button>)
                          : (
                            <button
                              type="button"
                              data-testid={ ` wrong-answer-${index}` }
                              onClick={ this.answersFunction }
                              className={ wrong }
                              key={ index }
                              disabled={ disabled }
                            >
                              {e.reposta}
                            </button>
                          )
                      ))}
                      <button
                        type="button"
                        onClick={ this.handleClick }
                      >
                        {' '}
                        Proxima
                      </button>
                    </section>
                  </div>)
        )}
      </div>
    );
  }
}

export default connect()(Trivia);
