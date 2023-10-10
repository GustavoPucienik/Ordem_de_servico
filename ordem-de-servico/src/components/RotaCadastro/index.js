import React from 'react';
import "./index.css";
import Header from '../Header';
import CadastroForm from '../CadastroFormulario';

const Cadastro = () => {

  return (
    <>
      <Header nome="cadastrar"/>
      <div className='body-cadastro'>
        <div className='formulario-cadastro'>
          <h1 className='titulo-cadastro'>Cadastro</h1>
          <CadastroForm/>
        </div>
      </div>
    </>
  )
}

export default Cadastro;