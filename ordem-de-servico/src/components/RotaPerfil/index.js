import styles from "./index.module.css";
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import axios from "axios";
import { API_BASE_URL } from '../../config';
import verificaUsuario from "../../middlewares/checkaUsuario";

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;
const URLAtualizarSenha = `${API_BASE_URL}/dadosusuario`;

const Dashboard = () => {
  // Estados para armazenar os dados do usuário e as informações de senha
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // useEffect para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obter token de autenticação do armazenamento local
        const token = localStorage.getItem('token');
        // Fazer uma solicitação GET para obter os dados do usuário
        const response = await axios.get(URLPegaDados, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        // Atualizar os estados com os dados do usuário
        setDados(response.data);
        setNome(response.data.nome);
        setSetor(response.data.setor);
      } catch (error) {
        // Lidar com erros, redirecionando para a página de login em caso de falha
        alert("Erro ao buscar dados do usuário. Você será redirecionado!", error);
        window.location = "/login";
      }
    };
    fetchData();
  }, []);

  // Função para lidar com o envio do formulário de alteração de senha
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se as novas senhas coincidem
    if (novaSenha !== confirmaSenha) {
      alert("As novas senhas não coincidem!");
      return;
    }

    // Obter token de autenticação do armazenamento local
    const token = localStorage.getItem('token');
    // Construir o objeto de dados para a atualização da senha
    const dadosAtualizados = {
      senha: senhaAtual,
      novaSenha: novaSenha,
      email: dados.email
    };

    try {
      // Enviar uma solicitação PUT para atualizar a senha
      await axios.put(URLAtualizarSenha, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // Limpar os estados de senha após uma atualização bem-sucedida
      alert("Senha atualizada com sucesso!");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmaSenha("");
    } catch (error) {
      // Lidar com erros de atualização de senha
      console.error("Erro ao atualizar a senha do usuário:", error);
      alert("Erro ao atualizar a senha. Verifique se a senha atual está correta.");
    }
  };

  return (
    <>
      {/* Componente do cabeçalho */}
      <Header nome="perfil" />
      <div className={styles.bodyDashboard}>
      {/* Formulário para alteração de senha */}
        <form className={styles.dashboard} onSubmit={handleSubmit}>
          <h1>Perfil</h1>
          <div className={styles.dadosDashboard}>
            <div className={styles.coluna0}>
            {/* Exibir os dados do usuário */}
              <label>Nome:</label>
              <p>{dados && dados.nome}</p>
              <label>Setor:</label>
              <p>{dados && dados.setor}</p>
              <label>Email:</label>
              <p>{dados && dados.email}</p>
            </div>
            <div className={styles.coluna1}>
            {/* Inputs para a senha atual, nova senha e confirmação de senha */}
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
          {/* Botões para ações do perfil */}
          <div className={styles.buttonsPerfil}>
          {/* Botão para fechar ordens (disponível apenas para usuários do setor de Manutenção) */}
            {dados && (dados.setor === "Manutencao" || dados.setor === "Manutenção") ? (
              <button className={styles.botaoAlterar} onClick={() => {window.location = "/ordens"}} type="button">Fechar ordens</button>
            ) : ""}
            {/* Botão para enviar o formulário de alteração de senha */}
            <button className={styles.botaoAlterar} type="submit">Alterar senha</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default verificaUsuario(Dashboard); //Middleware que verifica se o usuario tem token de autenticação
