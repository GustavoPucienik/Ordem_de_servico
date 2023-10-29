import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./index.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const baseURL = `${API_BASE_URL}/login`;

const LoginForm = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

const handleChange = async (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(baseURL, formData);
    if (response.data.message) {
      alert("email não existe ou a senha está incorreta!")
    } else{
      const token = response.data.token; // Extrai o token da resposta
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token)
    alert(`Usuario com email ${formData.email} logado com sucesso!`);
    history('/perfil');
    }
  } catch (error) {
    console.error("Erro ao logar:", error);
  }

}

  return (
    <>
      <form className='dados-login' onSubmit={handleSubmit}>
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

        <button className='buttonDeSubmit' type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm;
