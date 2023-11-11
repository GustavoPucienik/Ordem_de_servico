import React from 'react';
import Header from '../Header';
import BodyOrdensReq from "../BodyOrdensReq";
import redireciona from "../../middlewares/SemTokenRedireciona.js";

const RotaOrdens = () => {
  redireciona();
  return (
    <div>
      <Header nome="ordens-req"/>
      <BodyOrdensReq/>
    </div>
  )
}

export default RotaOrdens;