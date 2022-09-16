import React from 'react'
import './App.css';
import Login  from './Pages/Login';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import { Home } from './Pages/Home';
import './Interceptors/axios';
import Container from './Components/Container';
import Ticket from './Pages/Ticket';
import GameType from './Pages/GameType';
import Game from './Pages/Game';
import ManageGame from './Pages/ManageGame';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={()=><Container><Home /></Container>} /> 
        <Route exact path="/login" component={()=><Login />} /> 
        <Route exact path="/home" component={()=><Container><Home /></Container>} /> 
        <Route exact path="/gametype" component={()=><Container><GameType /></Container>} /> 
        <Route exact path="/game" component={()=><Container><Game /></Container>} /> 
        <Route exact path="/game/manage/:slug" component={()=><Container><ManageGame /></Container>} /> 
        <Route exact path="/game/manage/:slug/ticket" component={()=><Container><Ticket /></Container>} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
