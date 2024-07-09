import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate do react-router-dom para navegação
import React, { useEffect, useState } from 'react';
import styles from "./index.module.css"; // Importa os estilos específicos para este componente
import axios from "axios"; // Importa a biblioteca Axios para realizar requisições HTTP
import { API_BASE_URL } from '../../config'; // Importa a URL base da API a partir das configurações

const baseURL = `${API_BASE_URL}/login`; // URL para o endpoint de login

const LoginForm = () => {
  const navigate = useNavigate(); // Hook do react-router-dom para navegação

  const [formData, setFormData] = useState({ // setar os estados do email e senha que serão enviados para a api
    email: "",
    senha: ""
  });

// Função para lidar com as mudanças nos campos do formulário
const handleChange = async (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
  console.log(`Campo ${name} alterado para ${value}`);}


// Verifica se o usuário já está logado ao montar o componente
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token encontrado, redirecionando para /perfil');
    navigate('/ods/perfil'); // Redireciona para o perfil
  }
}, [navigate]);

// Função para lidar com o envio do formulário
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Formulário enviado', formData);
  try {
    const response = await axios.post(baseURL, formData);// Envia os dados do formulário para a API de login
    console.log('Resposta da API:', response.data);
    if (response.data.msg) {
      return alert(response.data.msg); // Exibe uma mensagem de erro, se houver, retornada pela API
    } else{
      const token = response.data.token; // Extrai o token da resposta
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Define o token como padrão para as futuras requisições Axios
    localStorage.setItem('token', token) // Armazena o token no localStorage para sessão persistente
    alert(`Usuario com email ${formData.email} logado com sucesso!`); // Exibe uma mensagem de sucesso
    navigate('/ods/perfil');// Navega para a página de perfil
    }
  } catch (error) {
    console.error("Erro ao logar:", error); // Exibe um erro caso ocorra um problema na requisição
  }

}

  return (
    <>
      <form className={styles.dadosLogin} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder='Coloque seu email de usuario'
          onChange={handleChange}
          value={formData.email}
          required
        /><br />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder='Coloque sua senha'
          onChange={handleChange}
          value={formData.senha}
          required
        /><br />

        <button className={styles.buttonDeSubmit} type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm;
