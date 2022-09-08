import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Configuraçoes from './components/Configuraçoes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Header } />
        <Route exact path="/configuracoes" component={ Configuraçoes } />
      </Switch>
    </div>
  );
}
