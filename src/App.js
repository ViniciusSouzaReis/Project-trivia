import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';
import Configuraçoes from './components/Configuraçoes';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/configuracoes" component={ Configuraçoes } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
