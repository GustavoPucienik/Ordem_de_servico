import React from 'react';
import Header from "../Header";
import redireciona from "../../middlewares/SemTokenRedireciona.js";
import CriarOrdemForm from "../CriarOrdemForm";

const criarOrdem = () => {
  redireciona();
  return (
    <div>
      <Header nome="criarOrdem"/>
      <CriarOrdemForm/>
    </div>
  )
}

export default criarOrdem;