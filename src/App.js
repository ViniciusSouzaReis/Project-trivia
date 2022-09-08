import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Configuraçoes from './components/Configuraçoes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/configuraçoes" component={ Configuraçoes } />
      </Switch>
    </div>
  );
}
