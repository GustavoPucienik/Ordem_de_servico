import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa componentes do React Router para gerenciamento de rotas
import Home from './components/RotaHome';
// Importa o componente Home para a rota "/"
import Cadastro from './components/RotaCadastro';
// Importa o componente Cadastro para a rota "/cadastrar"
import Login from './components/RotaLogin';
// Importa o componente Login para a rota "/login"
import Perfil from './components/RotaPerfil';
// Importa o componente Perfil para a rota "/perfil"
import CriarOrdem from './components/RotaCriarOrdem';
// Importa o componente CriarOrdem para a rota "/criarOrdem"
import RotaOrdens from './components/RotaOrdens';
// Importa o componente RotaOrdens para a rota "/ordens"
import OrdemRequisitada from './components/OrdemRequisitada';
// Importa o componente OrdemRequisitada para a rota "/ordemrequisitada/:id"
import RotaOrdensConcluidas from './components/RotaOrdensConcluidas';
// Importa o componente RotaOrdensConcluidas para a rota "/ordensconcluidas"
import RotaEditarOrdem from './components/RotaEditarOrdem';
// Importa o componente RotaEditarOrdem para a rota "/editarordem/:id"
import RotaEditarLinhas from './components/RotaEditarLinhas';
// Importa o componente RotaEditarLinhas para a rota "/editarlinhas"

function App() {
  return (
    <div className="App">
      {/* Define a div principal com a classe "App" */}
      <BrowserRouter>
      {/* Define o BrowserRouter para habilitar o uso de rotas */}
        <Routes>
        {/* Define as rotas da aplicação */}
          <Route path="/" element={<Home />} />
          {/* Rota para o componente Home */}
          <Route path="/login" element={<Login />} />
          {/* Rota para o componente Login */}
          <Route path="/cadastrar" element={<Cadastro />} />
          {/* Rota para o componente Cadastro */}
          <Route path="/perfil" element={<Perfil />} />
          {/* Rota para o componente Perfil */}
          <Route path="/criarOrdem" element={<CriarOrdem/>}/>
          {/* Rota para o componente CriarOrdem */}
          <Route path="/ordens" element={<RotaOrdens/>}/>
          {/* Rota para o componente RotaOrdens */}
          <Route path="/ordemrequisitada/:id" element={<OrdemRequisitada/>}/>
          {/* Rota para o componente OrdemRequisitada com parâmetro id */}
          <Route path="/ordensconcluidas" element={<RotaOrdensConcluidas/>}/>
          {/* Rota para o componente RotaOrdensConcluidas */}
          <Route path="/editarordem/:id" element={<RotaEditarOrdem/>}/>
          {/* Rota para o componente RotaEditarOrdem com parâmetro id */}
          <Route path="/editarlinhas" element={<RotaEditarLinhas/>}/>
          {/* Rota para o componente RotaEditarLinhas */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// Exporta o componente App como padrão para ser usado em outros arquivos
