import './App.css';
import { Login } from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Pages/Home';
import './Interceptors/axios';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
