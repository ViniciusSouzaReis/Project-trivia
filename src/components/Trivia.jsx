import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerAction } from '../redux/actions';
import store from '../redux';
import '../trivia.css';

let clock;

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      nextBtn: false,
      trivia: [],
      counter: 0,
      array: [],
      wrong: '',
      correct: '',
      disabled: false,
      time: 30,
      difficulty: 0,
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    const state = store.getState();
    const responseCodeOk = state.game.trivia.response_code;
    const { counter } = this.state;
    if (responseCodeOk === 0) {
      this.setState({
        trivia: state.game.trivia.results,
        array: [state.game.trivia.results[counter].correct_answer,
          ...state.game.trivia.results[counter].incorrect_answers],
        nextBtn: false,
      });
    } else {
      console.log('expirou');
    }

    this.Clock();
  }

  playerPoint = (id) => {
    const { trivia, counter } = this.state;
    switch (trivia[counter].difficulty) {
    case 'hard':
      this.setState({ difficulty: 3 });
      break;
    case 'medium':
      this.setState({ difficulty: 2 });
      break;
    case 'easy':
      this.setState({ difficulty: 1 });
      break;
    default:
      break;
    }
    if (id === trivia[counter].correct_answer) {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }), () => {
        this.getScore();
      });
    }
  };

  getScore = () => {
    const { difficulty, time, assertions } = this.state;
    const { dispatch, name, email } = this.props;
    const TEN = 10;
    this.setState((prevState) => ({
      score: prevState.score + (TEN + (time * difficulty)),
    }), () => {
      const { score } = this.state;
      dispatch(playerAction(name, assertions, score, email));
    });
  };

  handleClick = () => {
    const { history } = this.props;
    const { counter } = this.state;
    const NUMBER_FOUR = 4;
    if (counter < NUMBER_FOUR) {
      this.setState((estadoAnterior) => ({
        counter: estadoAnterior.counter + 1,
        wrong: '',
        correct: '',
        time: 30,
        disabled: false,
        nextBtn: false,
      }), () => {
        this.counterUpdate();
      });
    }
    if (counter === NUMBER_FOUR) {
      history.push('/feedback');
    }
    this.Clock();
  };

  counterUpdate = () => {
    const { trivia, counter } = this.state;
    this.setState({
      array: [trivia[counter].correct_answer,
        ...trivia[counter].incorrect_answers],
    });
  };

  Clock = () => {
    const ONE_SECOND = 1000;
    clock = setInterval(() => {
      this.setState((prev) => ({
        time: prev.time - 1,
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
      });
    }, THIRTY_SECOND);
  };

  answersFunction = ({ target: { id } }) => {
    this.playerPoint(id);
    clearInterval(clock);
    this.setState({
      wrong: 'wrong-answer-css ',
      correct: 'correct-answer-css',
      disabled: true,
      nextBtn: true,
    });
  };

  render() {
    const { trivia,
      counter, array, wrong, correct, disabled, time, nextBtn } = this.state;
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
                            id={ e.resposta }
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
                              id={ e.resposta }
                              disabled={ disabled }
                            >
                              {e.reposta}
                            </button>
                          )
                      ))}
                      {(nextBtn || time === 0)
                        && (
                          <button
                            type="button"
                            onClick={ this.handleClick }
                            data-testid="btn-next"
                          >
                            {' '}
                            Next
                          </button>)}
                    </section>
                  </div>)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.user,
  email: state.user.email,
});

Trivia.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
