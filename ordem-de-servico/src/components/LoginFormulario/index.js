import React from 'react';
import "./index.css";

const handleChange = async (e) => {}

const handleSubmit = async (e) => {}

const LoginForm = () => {
  return (
    <>
      <form className='dados-login' onSubmit={handleSubmit}>
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

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder='Coloque sua senha'
          onChange={handleChange}
          required
        /><br />

        <button className='buttonDeSubmit' type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm;
