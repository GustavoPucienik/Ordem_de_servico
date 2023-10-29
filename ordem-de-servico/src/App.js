import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/RotaHome';
import Cadastro from './components/RotaCadastro';
import Login from './components/RotaLogin';
import Perfil from './components/RotaPerfil';
import CriarOrdem from './components/RotaCriarOrdem';
import RotaOrdens from './components/RotaOrdens';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/criarOrdem" element={<CriarOrdem/>}/>
          <Route path="/ordens" element={<RotaOrdens/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
