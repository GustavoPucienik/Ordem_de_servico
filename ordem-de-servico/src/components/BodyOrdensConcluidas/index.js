import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import verificacaoUsuarioManutencao from "../../middlewares/checkaUsuarioManutencao.js";
import { API_BASE_URL } from '../../config';
import * as XLSX from "xlsx";
import { format } from 'date-fns';

const URLPegaRequisicoes = `${API_BASE_URL}/ordensconcluidas`;
const URLDeletaReq = `${API_BASE_URL}/ordens/`;
const URLFiltradas = `${API_BASE_URL}/filtrarordensconcluidas`;

const BodyOrdensConcluidas = () => {
  const [dados, setDados] = useState([]);
  const [ordensFiltradas, setOrdensFiltradas] = useState([]);
  const [filtroName, setFiltroName] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");
  const [filtroLinha, setFiltroLinha] = useState("");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");

  const deletarOrdem = (id) => {
    axios.delete(`${URLDeletaReq}${id}`,{})
    .then(() => {
      // Atualizar o estado para refletir a exclusão
      setDados((prevData) => prevData.filter((item) => item.id !== id));
      if (ordensFiltradas.length > 0) {// Atualizar o estado para refletir a exclusão
        setOrdensFiltradas((prevFiltradas) => prevFiltradas.filter((item) => item.id !== id));
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir ordem:", error);
    });
  }

  useEffect(() => {
    verificacaoUsuarioManutencao()
    const pegaOrdens = () => {
      axios.get(URLPegaRequisicoes, {})
        .then((response) => {
          setDados(response.data);
        });
    }
    pegaOrdens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        await axios.get(`${URLFiltradas}?filtroName=${filtroName}&filtroSetor=${filtroSetor}&filtroLinha=${filtroLinha}&filtroDataInicio=${filtroDataInicio}&filtroDataFim=${filtroDataFim}`,{})
        .then( function (response){
          setOrdensFiltradas(response.data);
        })
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      }
  };

  const downloadXLSX = () => {
    const wb = XLSX.utils.book_new();
    
    wb.Props = {
      Title: 'Relatórios',
      Subject: 'Ordens de serviço',
      Author: 'Manutenção',
      CreatedDate: new Date(),
    };
    
    wb.SheetNames.push('Ordens Apwinner');
    
    const header = ["nome", "setor", "linha", "descrição do usuario", "Tipo de serviço", "Técnicos", 
    `inicio`, `termino`, `tempo`, `parada de máquina`, `item_defeito`, `problema`, `solucao`, 
    `concluida`];
    const data = [header, ...ordensFiltradas.map(requisicao => [
      requisicao.usuario_req,
      requisicao.setor,
      requisicao.linha,
      requisicao.descricao_req,
      requisicao.tipo_servico,
      requisicao.mecanicos,
      format(new Date(requisicao.inicio), 'dd/MM/yyyy HH:mm'), // Formatar inicio
      format(new Date(requisicao.termino), 'dd/MM/yyyy HH:mm'), // Formatar termino
      requisicao.tempo,
      requisicao.parada_maquina,
      requisicao.item_defeito,
      requisicao.problema,
      requisicao.solucao,
      requisicao.concluida
    ])];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    wb.Sheets['Ordens Apwinner'] = ws;
    
    XLSX.writeFile(wb, 'Relatório de manutenção AP WINNER.xlsx', { bookType: 'xlsx', type: 'bynary'});
  };

  return (
    <div className={styles.bodyOrdensReq}>
      <div className={styles.ordensReq}>
        <h1>Filtrar ordens Concluidas</h1>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js" integrity="sha512-jDEmOIskGs/j5S3wBWQAL4pOYy3S5a0y3Vav7BgXHnCVcUBXkf1OqzYS6njmDiKyqes22QEX8GSIZZ5pGk+9nA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <form className={styles.filtroForm} onSubmit={handleSubmit} >

          {/* Campo de filtro por nome de usuário */}
          <input type="text" placeholder="Filtrar por nome de usuário" value={filtroName}
            onChange={(e) => setFiltroName(e.target.value)}/>
          {/* Campo de filtro por setor */}
          <input type="text" placeholder="Filtrar por setor" value={filtroSetor}
            onChange={(e) => setFiltroSetor(e.target.value)}/>
          {/* Campo de filtro por Linha */}
          <input type="text" placeholder="Filtrar por linha" value={filtroLinha} 
          onChange={(e) => setFiltroLinha(e.target.value)}/>
          <div>
            {/* Campo de filtro por inicio */}
            <input type="date" required value={filtroDataInicio} onChange={(e) => setFiltroDataInicio(e.target.value)}/>
            {/* Campo de filtro por termino */}
            <input type="date" required value={filtroDataFim} onChange={(e) => setFiltroDataFim(e.target.value)}/>
          </div>
          <div>
            <button type="submit">Filtrar</button>
            {ordensFiltradas.length > 0 ?<button type="button" onClick={downloadXLSX}>Baixar filtradas em xlsx</button>:""}
          </div>
        </form>
        
          {ordensFiltradas.length > 0 ?
        <ul className={styles.ordensRequisitadas}> <h1>Ordens Filtradas</h1> 
          {ordensFiltradas ?
            ordensFiltradas.map((requisicao, index) => {
              // Formatando o campo createdAt
              const novoCreatedAt = new Date(requisicao.createdAt).toLocaleString('pt-BR').slice(0,17);
            return (
            <li className={styles.requisicaoC} key={index}>
              <div className={styles.requisicoesOrdem}>
                {requisicao.setor ? <p>Nome: {requisicao.usuario_req.split(" ")[0]}</p> : ""}
                {requisicao.setor ? <p>Setor: {requisicao.setor}</p> : ""}
                {requisicao.linha ? <p>Linha: {requisicao.linha}</p> : ""}
                {requisicao.createdAt ? <p>{novoCreatedAt}</p> : ""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{requisicao.descricao_req}</p>
              <div className={styles.botoesOrdensReq}>
                <button onClick={() => window.location = `/editarordem/${requisicao.id}`}>Editar</button>
                <button onClick={() => { deletarOrdem(requisicao.id) }}>Excluir</button>
              </div>
            </li>
          )}) : ""}
        </ul>: ""}
        <ul className={styles.ordensRequisitadas}>
          <h1>Ultimas ordens concluidas</h1>
          {dados ? 
            dados.map((requisicao, index) => {
              // Formatando o campo createdAt
              const novoCreatedAt = new Date(requisicao.createdAt).toLocaleString('pt-BR').slice(0,17);
              return (
            <li className={styles.requisicaoC} key={index}>
              <div className={styles.requisicoesOrdem}>
                {requisicao.setor ? <p>Nome: {requisicao.usuario_req.split(" ")[0]}</p> : ""}
                {requisicao.setor ? <p>Setor: {requisicao.setor}</p> : ""}
                {requisicao.linha ? <p>Linha: {requisicao.linha}</p> : ""}
                {requisicao.createdAt ? <p>{novoCreatedAt}</p> : ""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{requisicao.descricao_req}</p>
              <div className={styles.botoesOrdensReq}>
                <button onClick={() => window.location = `/editarordem/${requisicao.id}`}>Editar</button>
                <button onClick={() => { deletarOrdem(requisicao.id) }}>Excluir</button>
              </div>
            </li>
          )}) : ""}
        </ul>
      </div>
    </div>
  )
}

export default BodyOrdensConcluidas;
