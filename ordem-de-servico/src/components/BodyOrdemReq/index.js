import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';
import verificacaoUsuarioManutencao from "../../middlewares/checkaUsuarioManutencao.js";
import { useParams, useNavigate } from 'react-router-dom';


// URL para acessar os dados da ordem de serviço
const URLPegaRequisicao = `${API_BASE_URL}/ordens/`;

const BodyOrdemReq = () => {
  const navigate = useNavigate();
  const { id } = useParams();// Obtém o ID da ordem de serviço da URL
  const [dados, setDados] = useState([]); // Estado para armazenar os dados da ordem de serviço
  const [formData, setFormData] = useState({
    tipo_servico: "",
    inicio: "",
    termino: "",
    tempo: "",
    parada_maquina: "",
    mecanicos: "",
    item_defeito: "",
    problema: "",
    solucao: "",
    concluida: ""
  });  

  useEffect(()=> {
    axios.get(`${URLPegaRequisicao}${id}`, { // Obtém os dados da ordem de serviço com o ID específico
    })
    .then( function (response){
      setDados(response.data);
      //setFormData({ ...formData, mecanicoQresolveu: dados.nome })
    })
  },[id]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Envie os dados do formulário para o backend para atualizar a ordem
      await axios.put(`${URLPegaRequisicao}${id}`, formData);
      alert(`Ordem de serviço atualizada com sucesso!`);
      
    } catch (error) {
      alert("Erro ao atualizar a ordem de serviço:", error);
    }
    navigate("/ods/ordensconcluidas"); // Redireciona após o envio do formulário
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
                <select name="tipo_servico" 
                  onChange={(e) => setFormData({ ...formData, tipo_servico: e.target.value })}>
                  <option value="">Escolha aqui</option>
                  <option value="C. Emergencial">C. Emergencial</option>
                  <option value="Predial">Predial</option>
                  <option value="Ajuste operacional">Ajuste operacional</option>
                </select>
              </div>
              <div className={styles.tempo}>
                <p className={styles.pTempo}>Inicio da manutenção:</p>
                <input required className={styles.inputData} type="datetime-local" name="inicio"
                  value={formData.inicio} onChange={(e) => setFormData({ ...formData, inicio: e.target.value })} />
                <p className={styles.pTempo}>Fim da manutenção:</p>
                <input required className={styles.inputData} type="datetime-local" name="termino" 
                  value={formData.termino} onChange={(e) => setFormData({ ...formData, termino: e.target.value })}/>
                <p className={styles.pTempo}>Tempo da manutenção:</p>
                <input required className={styles.inputData} type="time" name="tempo" 
                  value={formData.tempo} onChange={(e) => setFormData({ ...formData, tempo: e.target.value })} />
                <p className={styles.pTempo}>Tempo que a linha parou:</p>
                <input className={styles.inputData} type="time" name="parada_maquina"
                 value={formData.parada_maquina} onChange={(e) => setFormData({ ...formData, parada_maquina: e.target.value })} />
              </div>
              <div className={styles.relatorio}>
                <p>Coloque abaixo o nome dos tecnicos</p>
                <input required type="text" placeholder='Nome de quem realizou a manutenção' name='mecanicos' value={formData.mecanicos} 
                  onChange={(e) => setFormData({ ...formData, mecanicos: e.target.value })}/><br />
                <p>Item com defeito:</p>
                <input required type="text" placeholder='Peças, maquinas etc...' name='item_defeito' value={formData.item_defeito}
                    onChange={(e) => setFormData({ ...formData, item_defeito: e.target.value })} /><br />
                <p>Defeito do item:</p>
                <input required type="text" placeholder='Falha apresentada' name='problema' value={formData.problema} 
                  onChange={(e) => setFormData({ ...formData, problema: e.target.value })} /><br />

                <p>Descreva o serviço realizado</p>
                <textarea required type="text" placeholder="Descreva aqui o serviço realizado"
                  name='solucao' 
                  maxLength={255}
                  value={formData.solucao}
                  onChange={(e) => setFormData({ ...formData, solucao: e.target.value, concluida:true })} /><br />

                <button type="submit">Fechar Ordem</button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default verificacaoUsuarioManutencao(BodyOrdemReq); // Aplica middleware de verificação de usuári