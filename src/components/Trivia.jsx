import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivia: [],
      counter: 0,
      array: [],
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
  }

  handleClick = () => {
    const { counter } = this.state;
    const NUMBER_FOUR = 4;
    if (counter < NUMBER_FOUR) {
      this.setState((estadoAnterior) => ({
        counter: estadoAnterior.counter + 1,
      }));
    }
  };

  render() {
    const { trivia, counter, array } = this.state;
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
    console.log(array2);
    return (
      <div>
        {(trivia.length !== 0
                && (
                  <div>
                    <p data-testid="question-category">{trivia[counter].category}</p>
                    <p data-testid="question-text">{trivia[counter].question}</p>
                    <section data-testid="answer-options">
                      {array2.map((e, index) => (
                        e.valor === true ? (
                          <button
                            type="button"
                            data-testid="correct-answer"
                            key={ 5 }
                          >
                            {e.resposta}
                          </button>)
                          : (
                            <button
                              type="button"
                              data-testid={ ` wrong-answer-${index}` }
                              key={ index }
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
