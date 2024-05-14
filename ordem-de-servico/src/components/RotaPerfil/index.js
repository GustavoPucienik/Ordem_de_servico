import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;
const URLAtualizarSenha = `${API_BASE_URL}/dadosusuario`;

const Dashboard = () => {
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

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
        setNome(response.data.nome);
        setSetor(response.data.setor);
      } catch (error) {
        alert("Erro ao buscar dados do usuário. Você será redirecionado!", error);
        window.location = "/login";
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmaSenha) {
      alert("As novas senhas não coincidem!");
      return;
    }

    const token = localStorage.getItem('token');
    const dadosAtualizados = {
      senha: senhaAtual,
      novaSenha: novaSenha,
      email: dados.email
    };

    try {
      await axios.put(URLAtualizarSenha, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert("Senha atualizada com sucesso!");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmaSenha("");
    } catch (error) {
      console.error("Erro ao atualizar a senha do usuário:", error);
      alert("Erro ao atualizar a senha. Verifique se a senha atual está correta.");
    }
  };

  return (
    <>
      <Header nome="perfil" />
      <div className={styles.bodyDashboard}>
        <form className={styles.dashboard} onSubmit={handleSubmit}>
          <h1>Altere sua senha</h1>
          <div className={styles.dadosDashboard}>
            <div className={styles.coluna0}>
              <label>Nome:</label>
              <p>{dados && dados.nome}</p>
              <label>Setor:</label>
              <p>{dados && dados.setor}</p>
              <label>Email:</label>
              <p>{dados && dados.email}</p>
            </div>
            <div className={styles.coluna1}>
              <label htmlFor="senhaAtual">Senha Atual:</label>
              <input
                className={styles.inputPerfil}
                type="password"
                name="senhaAtual"
                placeholder="Senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
              <label htmlFor="novaSenha">Nova Senha:</label>
              <input
                className={styles.inputPerfil}
                type="password"
                name="novaSenha"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
              <label htmlFor="confirmaSenha">Confirme a Nova Senha:</label>
              <input
                className={styles.inputPerfil}
                type="password"
                name="confirmaSenha"
                placeholder="Confirme a nova senha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttonsPerfil}>
            {dados && (dados.setor === "Manutencao" || dados.setor === "Manutenção") ? (
              <button className={styles.botaoAlterar} onClick={() => {window.location = "/ordens"}} type="button">Fechar ordens</button>
            ) : ""}
            <button className={styles.botaoAlterar} type="submit">Alterar senha</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
