import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';


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
    expect(history.location.pathname).toBe('/game');
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