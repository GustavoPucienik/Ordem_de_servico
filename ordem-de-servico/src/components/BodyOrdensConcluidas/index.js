import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaRequisicoes = `${API_BASE_URL}/ordensconcluidas`;
const URLDeletaReq = `${API_BASE_URL}/ordens/`

const BodyOrdensConcluidas = () => {
  const [dados, setDados] = useState([]);
  const deletarOrdem = (id) => {
    axios.delete(`${URLDeletaReq}${id}`)
    .then(() => {
      // Atualizar o estado para refletir a exclusão
      setDados((prevData) => prevData.filter((item) => item.id !== id));
    })
    .catch((error) => {
      console.error("Erro ao excluir ordem:", error);
    });
    
  }

  useEffect(()=> {
    axios.get(URLPegaRequisicoes, {
    })
    .then( function (response){
      setDados(response.data);
    });
  },[])
  return (
    <div className={styles.bodyOrdensReq}>
      <div className={styles.ordensReq}>
        <h1>Ordens concluidas</h1>
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
              <button onClick={() => window.location = `/ordemrequisitada/${requisicao.id}`}>Editar</button>
              <button onClick={() => {deletarOrdem(requisicao.id)}}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BodyOrdensConcluidas;