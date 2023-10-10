import React, { Component} from 'react';
import axios from "axios";

const baseURL = "https://localhost:8000/cadastrar";


class CadastroForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      setor: '',
      senha: '',
      confirmarSenha: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { nome, setor, senha, confirmarSenha } = this.state;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Envie os dados para o servidor ou realize as ações necessárias aqui
    const [cadastroUsuario, setCadastroUsuario] = React.useState(null);


    // Limpe o formulário após o envio bem-sucedido
    this.setState({
      nome: '',
      setor: '',
      senha: '',
      confirmarSenha: '',
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { nome, setor, senha, confirmarSenha } = this.state;
  
    return (
      <form className='dados-cadastro' onSubmit={this.handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder='Coloque seu nome de usuario'
          value={nome}
          onChange={this.handleChange}
          required
        /><br />

        <label htmlFor="setor">Setor:</label>
        <input
          type="text"
          name="setor"
          placeholder='Coloque seu setor'
          value={setor}
          onChange={this.handleChange}
          required
        /><br />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder='Coloque sua senha'
          value={senha}
          onChange={this.handleChange}
          required
        /><br />

        <label htmlFor="confirmarSenha">Confirmação de Senha:</label>
        <input
          type="password"
          name="confirmarSenha"
          placeholder='Confirme sua senha'
          value={confirmarSenha}
          onChange={this.handleChange}
          required
        /><br />

        <button className='buttonDeSubmit' onSubmit={criarUsuario} type="submit">Cadastrar</button>
      </form>
    );
  }
}

export default CadastroForm;
