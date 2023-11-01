import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaRequisicoes = `${API_BASE_URL}/requisicoes`;

const BodyOrdensReq = () => {
  const [dados, setDados] = useState([]);

  useEffect(()=> {
    axios.get(URLPegaRequisicoes, {
    })
    .then( function (response){
      setDados(response.data);
    })
  },[])
  return (
    <div className={styles.bodyOrdensReq}>
      <div className={styles.ordensReq}>
        <h1>Requisições</h1>
        <ul className={styles.ordensRequisitadas}>
          {dados.map((requisicao, index) => (
            <li  className={styles.requisicoesAberta} key={index}>
              <div className={styles.requisicoesOrdem}>
                <p>{requisicao.usuario_req}</p> 
                {requisicao.setor? <p>Setor: {requisicao.setor}</p> :""}
                {requisicao.linha? <p>Linha: {requisicao.linha}</p> :""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{requisicao.descricao_req}</p>
              <div className={styles.botoesOrdensReq}>
              <button onClick={() => window.location = `/ordemrequisitada/${requisicao.id}`}>Resolver</button>
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