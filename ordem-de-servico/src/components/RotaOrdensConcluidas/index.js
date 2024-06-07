import React from 'react';
import Header from '../Header';
import BodyOrdensConcluidas from "../BodyOrdensConcluidas";

// Componente para a rota de exibição de ordens concluídas
const RotaOrdensConcluidas = () => {
  return (
    <div>
      {/* Componente do cabeçalho */}
      <Header nome="ordens-concluidas"/>
      {/* Componente do corpo das ordens concluídas */}
      <BodyOrdensConcluidas/>
    </div>
  )
}

export default RotaOrdensConcluidas;