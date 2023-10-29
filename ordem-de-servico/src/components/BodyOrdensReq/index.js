import React, { useEffect, useState } from 'react';
import "./index.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaRequisicoes = `${API_BASE_URL}/requisicoes`;

const BodyOrdensReq = () => {
  const [dados, setDados] = useState([]);

  useEffect(()=> {
    axios.get(URLPegaRequisicoes, {
    })
    .then( function (response){
      setDados(response.data)
    })
  })
  return (
    <div className='body-ordens-req'>
      <div className='ordens-req'>
        <h1>Requisições</h1>
        <ul className='ordens-requisitadas'>
          {dados.map((requisicao, index) => (
            <li  className='requisicao-aberta' key={index}>
              <div className='requisicao-ordem'>
                <p>{requisicao.usuario_req}</p> 
                {requisicao.setor? <p>Setor: {requisicao.setor}</p> :""}
                {requisicao.linha? <p>Linha: {requisicao.linha}</p> :""}
              </div>
              <p className='requisicao-ordem-descricao'>{requisicao.descricao_req}</p>
              <div className='botoes-ordens'>
              <button>Resolver</button>
              <button>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BodyOrdensReq