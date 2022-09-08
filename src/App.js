import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}