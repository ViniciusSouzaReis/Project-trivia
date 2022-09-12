import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mockData from './helpers/mockData';
import Feedback from '../pages/Feedback';

const DATA = {
  user: {
    email: 'trybe@trybe.com',
    user: 'trybe',
    hash: 'b254d8c05b6e63c960686e2db0af90261df071643c25f18f7f2620b22fe3543f',
  },
  player: {
    name: 'trybe',
    assertions: 2,
    score: 55,
    gavatarEmail: 'trybe@trybe.com',
  },
  game: {
    trivia: mockData,
  },
}

const DATA_2 = {
  user: {
    email: 'trybe@trybe.com',
    user: 'trybe',
    hash: 'b254d8c05b6e63c960686e2db0af90261df071643c25f18f7f2620b22fe3543f',
  },
  player: {
    name: 'trybe',
    assertions: 5,
    score: 55,
    gavatarEmail: 'trybe@trybe.com',
  },
  game: {
    trivia: mockData,
  },
}


describe('Login Page Test', () => {
  test('Verify submits in the document', () => {
    renderWithRouter(<App />)

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputNome = screen.getByTestId('input-player-name');
    const submitButton = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');

    expect(inputEmail).toBeInTheDocument();
    expect(inputNome).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  })

  test('Enter in pathname "/game"', () => {
    const { history } = renderWithRouter(<App />)

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputNome = screen.getByTestId('input-player-name');
    const submitButton = screen.getByTestId('btn-play');

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'teste@teste.com');

    userEvent.click(inputNome);
    userEvent.type(inputNome, 'xablau')

    userEvent.click(submitButton);
    expect(submitButton).not.toBeDisabled
    expect(history.location.pathname).toBe('/');
  })
  test('Enter in pathname "/configuracoes"', () => {
    const { history } = renderWithRouter(<App />)

    const settingsButton = screen.getByTestId('btn-settings');

    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/configuracoes');

    expect(screen.getByText(/tela/i)).toBeInTheDocument()
  })
  test('Verify fetch in the document', () => {
    const token = {
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: '84e547e354000aaf3b8888bcf63a5841fe0331a23ccbb308e2229dcaa82868fe',
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });

    renderWithRouter(<App />)

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputNome = screen.getByTestId('input-player-name');
    const submitButton = screen.getByTestId('btn-play');

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'teste@teste.com');

    userEvent.click(inputNome);
    userEvent.type(inputNome, 'xablau')

    userEvent.click(submitButton);

    expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
  })
})

describe('Testa o componente Feedback até 90%', () => {
  test('Realização dos testes', () => {
    const { history } = renderWithRouter(<Feedback />, {initialState: DATA });
    
    expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();

    const btnPlay = screen.getByTestId("btn-play-again");
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay)

    expect(history.location.pathname).toBe('/');

    const btnRanking = screen.getByTestId("btn-ranking");
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking)

    expect(history.location.pathname).toBe('/ranking');
  })

  // test('Teste 2', () => {
  //   const { store } = renderWithRouter(<Feedback />, {initialState: DATA_2 });
    
  //   const wellDone = screen.getAllByTestId('feedback-text')
  //   expect(wellDone).toBeInTheDocument();
    
  // })
})