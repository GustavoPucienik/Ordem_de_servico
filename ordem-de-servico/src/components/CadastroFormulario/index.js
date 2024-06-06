import React, { useState } from 'react';
import styles from "../RotaCadastro/index.module.css";// Importa os estilos específicos para este componente
import axios from "axios";// Importa a biblioteca Axios para realizar requisições HTTP
import { API_BASE_URL } from '../../config';// Importa a URL base da API a partir das configurações

const baseURL = `${API_BASE_URL}/cadastrar`; // URL para o endpoint de cadastro


const CadastroForm = () => {
  const [formData, setFormData] = useState({// Define o estado inicial para os dados do formulário
    nome: "",
    setor: "",
    email: "",
    senha: "",
  });

  // Função para atualizar o estado conforme os campos do formulário são preenchidos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se a senha e a confirmação de senha coincidem
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return; // Impede o envio do formulário se as senhas não coincidirem
    }

    try {
      // Envia os dados do formulário para a API para realizar o cadastro
      const response = await axios.post(baseURL, formData, { headers: { "Content-Type": "application/json" }});
      if (response.data.msg) {
      return alert(response.data.msg);
      }
      alert(`Usuario ${response.data.nome} cadastrado com sucesso!`);
      window.location = "/login"; // Redireciona para a página de login após o cadastro bem-sucedido
    } catch (error) {
      alert("Erro ao enviar dados:", error); // Exibe um alerta em caso de erro no envio dos dados
    }
  };
  return (
    <>
      <form className={styles.dadosCadastro} onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder='Coloque seu nome de usuario'
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="setor">Setor:</label>
        <input
          type="text"
          name="setor"
          placeholder='Coloque seu setor'
          onChange={handleChange}
          required
        /><br />
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder='Coloque seu email de usuario'
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder='Coloque sua senha'
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="confirmarSenha">Confirmação de Senha:</label>
        <input
          type="password"
          name="confirmarSenha"
          placeholder='Confirme sua senha'
          onChange={handleChange}
          required
        /><br />

        <button className={styles.buttonDeSubmit} type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default CadastroForm; // Exporta o componente de formulário de cadastro
