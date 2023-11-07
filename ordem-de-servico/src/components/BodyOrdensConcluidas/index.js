import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';
import * as XLSX from "xlsx";

const URLPegaRequisicoes = `${API_BASE_URL}/ordensconcluidas`;
const URLDeletaReq = `${API_BASE_URL}/ordens/`;
const URLFiltradas = `${API_BASE_URL}/filtrarordensconcluidas`;
const URLBaixarxls = `${API_BASE_URL}/download-xls`

const BodyOrdensConcluidas = () => {
  const [dados, setDados] = useState([]);
  const [ordensFiltradas, setOrdensFiltradas] = useState([]);
  const [filtroName, setFiltroName] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");
  const [filtroLinha, setFiltroLinha] = useState("");

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

  useEffect(() => {
    const pegaOrdens = () => {
      axios.get(URLPegaRequisicoes)
        .then((response) => {
          setDados(response.data);
        });
    }
    pegaOrdens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.get(`${URLFiltradas}?filtroName=${filtroName}&filtroSetor=${filtroSetor}&filtroLinha=${filtroLinha}`);
        setOrdensFiltradas(response.data);
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
    
    const header = ["nome", "setor", "linha"];
    const data = [header, ...ordensFiltradas.map(requisicao => [requisicao.usuario_req, requisicao.setor, requisicao.linha])];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    wb.Sheets['Ordens Apwinner'] = ws;
    
    XLSX.writeFile(wb, 'Relatório de manutenção AP WINNER.xlsx', { bookType: 'xlsx', type: 'bynary'});
  };

  return (
    <div className={styles.bodyOrdensReq}>
      <div className={styles.ordensReq}>
        <h1>Ordens concluídas</h1>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js" integrity="sha512-jDEmOIskGs/j5S3wBWQAL4pOYy3S5a0y3Vav7BgXHnCVcUBXkf1OqzYS6njmDiKyqes22QEX8GSIZZ5pGk+9nA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <form onSubmit={handleSubmit} >
          {/* Campo de filtro por nome de usuário */}
          <input
            type="text"
            placeholder="Filtrar por nome de usuário"
            value={filtroName}
            onChange={(e) => setFiltroName(e.target.value)}
          />
          {/* Campo de filtro por setor */}
          <input
            type="text"
            placeholder="Filtrar por setor"
            value={filtroSetor}
            onChange={(e) => setFiltroSetor(e.target.value)}
          />
          {/* Campo de filtro por Linha */}
          <input
            type="text"
            placeholder="Filtrar por linha"
            value={filtroLinha}
            onChange={(e) => setFiltroLinha(e.target.value)}
          />
          <button type="submit">Filtrar</button>
          {ordensFiltradas !== null?<button type="button" onClick={downloadXLSX}>Baixar filtradas em xlsx</button>:""}
        </form>

        <ul className={styles.ordensRequisitadas}>
          {ordensFiltradas ? 
            ordensFiltradas.map((requisicao, index) => (
            <li className={styles.requisicoesAberta} key={index}>
              <div className={styles.requisicoesOrdem}>
                {requisicao.setor ? <p>Nome: {requisicao.usuario_req.split(" ")[0]}</p> : ""}
                {requisicao.setor ? <p>Setor: {requisicao.setor}</p> : ""}
                {requisicao.linha ? <p>Linha: {requisicao.linha}</p> : ""}
              </div>
              <p className={styles.requisicaoOrdemDescricao}>{requisicao.descricao_req}</p>
              <div className={styles.botoesOrdensReq}>
                <button onClick={() => window.location = `/ordemrequisitada/${requisicao.id}`}>Editar</button>
                <button onClick={() => { deletarOrdem(requisicao.id) }}>Excluir</button>
              </div>
            </li>
          )) : ""}
        </ul>
      </div>
    </div>
  )
}

export default BodyOrdensConcluidas;
