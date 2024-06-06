import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import verificacaoUsuarioManutencao from "../../middlewares/checkaUsuarioManutencao.js";
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import verificaUsuario from '../../middlewares/checkaUsuario.js';

// URL para acessar os dados da ordem de serviço
const URLPegaRequisicao = `${API_BASE_URL}/ordens/`;

const BodyOrdemReq = () => {
  const { id } = useParams();// Obtém o ID da ordem de serviço da URL
  const [dados, setDados] = useState([]);// Estado para armazenar os dados da ordem de serviço

  useEffect(()=> {
    verificacaoUsuarioManutencao(); // Verifica se o usuário tem permissão de manutenção
    axios.get(`${URLPegaRequisicao}${id}`, { //Pegando os dados da ordem
    })
    .then( function (response){
      // Formatar datas usando o objeto Date
      const formattedInicio = response.data.inicio ? new Date(response.data.inicio).toISOString().slice(0, 16) : '';
      const formattedTermino = response.data.termino ? new Date(response.data.termino).toISOString().slice(0, 16) : '';
      response.data.inicio = formattedInicio;
      response.data.termino = formattedTermino;
      setDados(response.data);

    })
  },[id]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Envie os dados do formulário para o backend para atualizar a ordem
      await axios.put(`${URLPegaRequisicao}${id}`, dados);
      alert(`Ordem de serviço atualizada com sucesso!`);
      
    } catch (error) {
      alert("Erro ao atualizar a ordem de serviço:", error);
    }
    window.location = "/ordensconcluidas";
  };

  return (
    <div className={styles.bodyOrdemReq}>
      <div className={styles.ordemReq}>
        <h1>Formulário de ordem de serviço</h1>
        <div className={styles.ordemRequisitada}>
            <div  className={styles.requisicaoAberta} >
              <div className={styles.requisicaoOrdem}>
                <p>{dados.usuario_req}</p> 
                {dados ? <p>Setor: {dados.setor}</p> :""}
                {dados ? <p>linha: {dados.linha}</p> :""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{dados.descricao_req}</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.formOrdemReq}>
              <div className={styles.tipoServico}>
                <h1 className={styles.titulos}>Relátorio técnico</h1>
                <p className={styles.pTempo}>Que tipo de manutenção foi realizada:</p>
                <select name="tipo_servico" id='servicoSelecionado' value={dados.tipo_servico}
                  onChange={(e) => setDados({ ...dados, tipo_servico: e.target.value })}>
                  <option value="">Escolha aqui</option>
                  <option value="C. Emergencial">C. Emergencial</option>
                  <option value="Predial">Predial</option>
                  <option value="Ajuste operacional">Ajuste operacional</option>
                </select>
              </div>
              <div className={styles.tempo}>
                <p className={styles.pTempo}>Inicio da manutenção:</p>
                <input required className={styles.inputData} type="datetime-local" name="inicio"
                  value={dados.inicio} onChange={(e) => setDados({ ...dados, inicio: e.target.value })} />
                <p className={styles.pTempo}>Fim da manutenção:</p>
                <input required className={styles.inputData} type="datetime-local" name="termino" 
                  value={dados.termino} onChange={(e) => setDados({ ...dados, termino: e.target.value })}/>
                <p className={styles.pTempo}>Tempo da manutenção:</p>
                <input required className={styles.inputData} type="time" name="tempo" 
                  value={dados.tempo} onChange={(e) => setDados({ ...dados, tempo: e.target.value })} />
                <p className={styles.pTempo}>Tempo que a linha parou:</p>
                <input className={styles.inputData} type="time" name="parada_maquina"
                 value={dados.parada_maquina} onChange={(e) => setDados({ ...dados, parada_maquina: e.target.value })} />
              </div>
              <div className={styles.relatorio}>
                <p>Coloque abaixo o nome dos tecnicos</p>
                <input required type="text" placeholder='Nome de quem realizou a manutenção' name='mecanicos' value={dados.mecanicos} 
                  onChange={(e) => setDados({ ...dados, mecanicos: e.target.value })}/><br />
                <p>Item com defeito:</p>
                <input required type="text" placeholder='Peças, maquinas etc...' name='item_defeito' value={dados.item_defeito}
                    onChange={(e) => setDados({ ...dados, item_defeito: e.target.value })} /><br />
                <p>Defeito do item:</p>
                <input required type="text" placeholder='Defeito do item' name='problema' value={dados ? dados.problema : ""} 
                  onChange={(e) => setDados({ ...dados, problema: e.target.value })} /><br />

                <p>Descreva o serviço realizado</p>
                <textarea required type="text" placeholder="Descreva aqui o serviço realizado"
                  name='solucao' 
                  maxLength={255}
                  value={dados.solucao}
                  onChange={(e) => setDados({ ...dados, solucao: e.target.value, concluida:true })} /><br />

                <button type="submit">Editar Ordem</button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default verificaUsuario(BodyOrdemReq); // Aplica middleware de verificação de usuário