import React, { useState } from 'react';
import axios from "axios";
import { API_BASE_URL } from '../../config';

const baseURL = `${API_BASE_URL}/cadastrar`;


const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    setor: "",
    email: "",
    senha: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se a senha e a confirmação de senha coincidem
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return; // Impede o envio do formulário se as senhas não coincidirem
    }

    try {
      const response = await axios.post(baseURL, formData, { headers: { "Content-Type": "application/json" }});
      console.log("Resposta do servidor:", response.data);
      alert(`Usuario ${formData.nome} cadastrado com sucesso!`);
      window.location = "/login";
    } catch (error) {
      alert("Erro ao enviar dados:", error);
    }
  };
  return (
    <>
      <form className='dados-cadastro' onSubmit={handleSubmit}>
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

        <button className='buttonDeSubmit' type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default CadastroForm;
