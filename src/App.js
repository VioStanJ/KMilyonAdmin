import './App.css';
import { Login } from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import './Interceptors/axios';
import Container from './Components/Container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Container><Home /></Container>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
