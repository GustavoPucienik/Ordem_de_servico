import './App.css';
//import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/RotaHome';
import Cadastro from './components/RotaCadastro';
import Login from './components/RotaLogin';

/* const instance = axios.create({
  baseURL: 'https://localhost:8000',
  headers: {
    "content-Type": "application/json"
  }
}) */

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastrar" element={<Cadastro />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
