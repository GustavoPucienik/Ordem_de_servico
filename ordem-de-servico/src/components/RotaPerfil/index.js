import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;

const Dashboard = () => {
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(URLPegaDados, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setDados(response.data);
        // Pré-preencha os campos com os dados do usuário
        setNome(response.data.nome);
        setSetor(response.data.setor);
      } catch (error) {
        alert("Erro ao buscar dados do usuário. Você sera redirecionado!", error);
        window.location = "/login";
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {

    const token = localStorage.getItem('token');
    const dadosAtualizados = { nome, setor, email: dados.email }; // Use os estados atualizados

    try {
      const response = await axios.put(URLPegaDados, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setDados(response.data);
      // Pré-preencha os campos com os dados do usuário
      setNome(response.data.nome);
      setSetor(response.data.setor);
      // Atualize o estado ou exiba uma mensagem de sucesso
      alert("Dados atualizados com sucesso!");

    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  return (
    <>
      <Header nome="perfil" />
      <div className={styles.bodyDashboard}>
        <form className={styles.dashboard} onSubmit={handleSubmit}>
          <h1>Altere seus dados</h1>
          <div className={styles.dadosDashboard}>
            <div className={styles.coluna0}>
              <label >Nome:</label>
              <p>{dados && dados.nome}</p>
              <label >Setor:</label>
              <p>{dados && dados.setor}</p>
              <label >Email:</label>
              <p>{dados && dados.email}</p>
            </div>
            <div className={styles.coluna1}>
              <label htmlFor="nome">Nome:</label>
              <input className={styles.inputPerfil} type="text" name="nome" placeholder="Altere seu nome" onChange={(e) => setNome(e.target.value)} />
              <label htmlFor="setor">Setor:</label>
              <input className={styles.inputPerfil} type="text" name="setor" placeholder="Altere seu setor" onChange={(e) => setSetor(e.target.value)} />
            </div>
          </div>
          <div className={styles.buttonsPerfil}>
          {dados && (dados.setor === "Manutencao" || dados.setor === "Manutenção") ? (
          <button className={styles.botaoAlterar} onClick={() => {window.location = "/ordens"}} type="button">Fechar ordens</button>)
          :""}
          <button className={styles.botaoAlterar} type="submit">Alterar dados</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
