import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const URLPegaRequisicao = `${API_BASE_URL}/ordens/`;

const BodyOrdemReq = () => {
  const { id } = useParams();
  const [dados, setDados] = useState([]);

  useEffect(()=> {
    axios.get(`${URLPegaRequisicao}${id}`, {
    })
    .then( function (response){
      setDados(response.data);
    })
  },[])
  return (
    <div className={styles.bodyOrdemReq}>
      <div className={styles.ordemReq}>
        <h1>Fechar ordem de serviço</h1>
        <div className={styles.ordemRequisitada}>
            <div  className={styles.requisicaoAberta} >
              <div className={styles.requisicaoOrdem}>
                <p>{dados.usuario_req}</p> 
                {dados ? <p>Setor: {dados.setor}</p> :""}
                {dados ? <p>linha: {dados.linha}</p> :""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{dados.descricao_req}</p>
            </div>
            <form className={styles.formOrdemReq}>
              <div className={styles.tipoServico}>
                <h1 className={styles.titulos}>Escolha o tipo de serviço</h1>
                <select name="tipo_servico">
                  <option value="">Escolha aqui</option>
                  <option value="C. Emergencial">C. Emergencial</option>
                  <option value="Predial">Predial</option>
                </select>
              </div>
              <div className={styles.tempo}>
                <h1 className={styles.titulos}>Inicio e fim da manutenção</h1>
                <p className={styles.pTempo}>Inicio da manutenção</p>
                <input className={styles.inputData} type="datetime-local" name="inicio" />
                <p className={styles.pTempo}>Fim da manutenção</p>
                <input className={styles.inputData} type="datetime-local" name="termino" />
              </div>
              <div className={styles.mecanicos}>
                <h1 className={styles.titulos}>Técnicos</h1>
                <p>Coloque abaixo o nome de quem fez a manutenção</p>
                <input type="text" />
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default BodyOrdemReq