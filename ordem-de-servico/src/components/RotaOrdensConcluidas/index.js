import React from 'react';
import Header from '../Header';
import BodyOrdensConcluidas from "../BodyOrdensConcluidas";
import redireciona from "../../middlewares/SemTokenRedireciona.js";

const RotaOrdensConcluidas = () => {
  redireciona();
  return (
    <div>
      <Header nome="ordens-concluidas"/>
      <BodyOrdensConcluidas/>
    </div>
  )
}

export default RotaOrdensConcluidas;