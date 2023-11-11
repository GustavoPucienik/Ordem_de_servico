import React from 'react';
import Header from "../Header";
import CriarOrdemForm from "../CriarOrdemForm";

const criarOrdem = () => {
  return (
    <div>
      <Header nome="criarOrdem"/>
      <CriarOrdemForm/>
    </div>
  )
}

export default criarOrdem;