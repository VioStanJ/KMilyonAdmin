import React from 'react'
import './App.css';
import { Login } from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import './Interceptors/axios';
import Container from './Components/Container';
import Ticket from './Pages/Ticket';
import Welcome from './Pages/Welcome';
import GameType from './Pages/GameType';
import Game from './Pages/Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Container><Home /></Container>} /> 
        <Route path="/ticket" element={<Container><Ticket /></Container>} /> 
        <Route path="/gametype" element={<Container><GameType /></Container>} /> 
        <Route path="/game" element={<Container><Game /></Container>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
