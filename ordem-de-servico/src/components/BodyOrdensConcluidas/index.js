import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import verificacaoUsuarioManutencao from "../../middlewares/checkaUsuarioManutencao.js";
import { API_BASE_URL } from '../../config';
import * as XLSX from "xlsx";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import verificaUsuario from "../../middlewares/checkaUsuario.js";

// URLs para acessar dados e operações relacionadas às ordens de serviço
const URLPegaRequisicoes = `${API_BASE_URL}/ordensconcluidas`;
const URLDeletaReq = `${API_BASE_URL}/ordens/`;
const URLFiltradas = `${API_BASE_URL}/filtrarordensconcluidas`;



const BodyOrdensConcluidas = () => {
  const [dados, setDados] = useState([]);// Estado para armazenar todas as ordens de serviço
  const [ordensFiltradas, setOrdensFiltradas] = useState([]); // Estado para armazenar as ordens de serviço filtradas
  const [filtroName, setFiltroName] = useState(""); // Estado para o filtro por nome de usuário
  const [filtroSetor, setFiltroSetor] = useState("");// Estado para o filtro por setor
  const [filtroLinha, setFiltroLinha] = useState("");// Estado para o filtro por linha
  const [filtroDataInicio, setFiltroDataInicio] = useState("");// Estado para o filtro de data de início
  const [filtroDataFim, setFiltroDataFim] = useState("");// Estado para o filtro de data de fim

  // Função para deletar uma ordem de serviço
  const deletarOrdem = (id) => {
    axios.delete(`${URLDeletaReq}${id}`,{})
    .then(() => {
      // Atualizar o estado para refletir a exclusão
      setDados((prevData) => prevData.filter((item) => item.id !== id));
      // Se houver ordens filtradas, atualizar o estado para refletir a exclusão
      if (ordensFiltradas.length > 0) {
        setOrdensFiltradas((prevFiltradas) => prevFiltradas.filter((item) => item.id !== id));
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir ordem:", error);
    });
  }

  // Efeito para buscar as ordens de serviço ao montar o componente
  useEffect(() => {
    verificacaoUsuarioManutencao()
    const pegaOrdens = () => {
      axios.get(URLPegaRequisicoes, {})
        .then((response) => {
          setDados(response.data); // Define as ordens de serviço no estado
        });
    }
    pegaOrdens();
  }, []);

  // Função para lidar com o envio do formulário de filtro
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        // Enviar solicitação para obter ordens de serviço filtradas
        await axios.get(`${URLFiltradas}?filtroName=${filtroName}&filtroSetor=${filtroSetor}&filtroLinha=${filtroLinha}&filtroDataInicio=${filtroDataInicio}&filtroDataFim=${filtroDataFim}`,{})
        .then( function (response){
          setOrdensFiltradas(response.data);// Definir as ordens de serviço filtradas no estado
        })
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      }
  };

  // Função para baixar as ordens de serviço filtradas em formato XLSX
  const downloadXLSX = () => {
    const wb = XLSX.utils.book_new();
    
    wb.Props = {
      Title: 'Relatórios',
      Subject: 'Ordens de serviço',
      Author: 'Manutenção',
      CreatedDate: new Date(),
    };
    
    wb.SheetNames.push('Ordens Apwinner');
    
    // Cabeçalho das colunas no arquivo XLS
    const header = ["nome", "setor", "linha", "descrição do usuario", "Tipo de serviço", "Técnicos", 
    `inicio`, `termino`, `tempo`, `parada de máquina`, `item_defeito`, `problema`, `solucao`, 
    `concluida`];

    // Dados das ordens de serviço filtradas para o arquivo XLSX
    const data = [header, ...ordensFiltradas.map(requisicao => [
      requisicao.usuario_req,
      requisicao.setor,
      requisicao.linha,
      requisicao.descricao_req,
      requisicao.tipo_servico,
      requisicao.mecanicos,
      format(new Date(requisicao.inicio), 'dd/MM/yyyy HH:mm'), // Formatar inicio da manutenção
      format(new Date(requisicao.termino), 'dd/MM/yyyy HH:mm'), // Formatar termino da manutenção
      requisicao.tempo,
      requisicao.parada_maquina,
      requisicao.item_defeito,
      requisicao.problema,
      requisicao.solucao,
      requisicao.concluida
    ])];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    wb.Sheets['Ordens Apwinner'] = ws;
    
    // Baixar o arquivo XLSX com as ordens de serviço filtradas
    XLSX.writeFile(wb, 'Relatório de manutenção AP WINNER.xlsx', { bookType: 'xlsx', type: 'bynary'});
  };

  const navigate = useNavigate();

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
                <button onClick={() => navigate(`/ods/editarordem/${requisicao.id}`)}>Editar</button>
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
                <button onClick={() => navigate(`/ods/editarordem/${requisicao.id}`)}>Editar</button>
                <button onClick={() => { deletarOrdem(requisicao.id) }}>Excluir</button>
              </div>
            </li>
          )}) : ""}
        </ul>
      </div>
    </div>
  )
}

export default verificaUsuario(BodyOrdensConcluidas); //Verificar se o usuario tem token de autenticação
