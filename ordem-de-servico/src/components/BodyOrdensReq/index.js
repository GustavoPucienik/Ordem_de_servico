import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import verificacaoUsuarioManutencao from "../../middlewares/checkaUsuarioManutencao.js";
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import verificaUsuario from "../../middlewares/checkaUsuario.js";

// URLs para acessar dados e operações relacionadas às ordens de serviço
const URLPegaRequisicoes = `${API_BASE_URL}/ordens`;
const URLDeletaReq = `${API_BASE_URL}/ordens/`;

const BodyOrdensReq = () => {
  const [dados, setDados] = useState([]); // Estado para armazenar todas as ordens de serviço

  // Função para deletar uma ordem de serviço
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

  // Efeito para buscar as ordens de serviço ao montar o componente
  useEffect(()=> {
    verificacaoUsuarioManutencao(); // Verifica se o usuário tem permissão de manutenção
    axios.get(URLPegaRequisicoes, {
    })
    .then( function (response){
      setDados(response.data); // Define as ordens de serviço no estado
    });
  },[])

  const navigate = useNavigate();
  
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
              <button onClick={() => navigate(`/ods/ordemrequisitada/${requisicao.id}`)}>Resolver</button>
              <button onClick={() => {deletarOrdem(requisicao.id)}}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

//middleware que verifica se o usuario possui token de autenticação
export default verificaUsuario(BodyOrdensReq);
