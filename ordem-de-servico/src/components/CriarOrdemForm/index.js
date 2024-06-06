import React, { useEffect, useState } from 'react';
import styles from "./index.module.css"; // Importa os estilos específicos para este componente
import axios from "axios"; // Importa a biblioteca Axios para realizar requisições HTTP
import { API_BASE_URL } from '../../config';// Importa a URL base da API a partir das configurações

const URLCadastraOrdem = `${API_BASE_URL}/ordens`; // URL para o endpoint de cadastro de ordens
const URLPegaLinhas = `${API_BASE_URL}/linha`; // URL para o endpoint de obtenção das linhas

const CriarOrdemForm = () => {
  const [linhas, setLinhas] = useState([]); // Estado para armazenar as linhas disponíveis
  const [formData, setFormData] = useState({ // Estado para armazenar os dados do formulário
    usuario_req: "",
    setor: "",
    linha: "",
    descricao_req: "",
  });
  
  // useEffect para buscar as linhas ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const linhasRes = await axios.get(URLPegaLinhas) // Requisição para obter as linhas
        setLinhas(linhasRes.data); // Atualiza o estado com as linhas obtidas da API
      } catch (error) {
        alert(error); // Exibe um alerta em caso de erro na requisiçã
      }
    };
    fetchData(); // Chama a função para buscar as linhas
  }, []);

  // Função para lidar com as mudanças nos campos do formulário
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
    try {
      // Envia os dados do formulário para a API para cadastrar uma nova ordem
      const response = await axios.post(URLCadastraOrdem, formData, { headers: { "Content-Type": "application/json" }});
      if (response.data.msgErro) {
        return alert(response.data.msgErro) // Exibe um alerta em caso de erro retornado pela API
      }
      alert(response.data.msg); // Exibe um alerta com a mensagem de sucesso retornado pela API

      // Limpar os campos do formulário após o envio bem-sucedido
      setFormData({
        usuario_req: "",
        setor: "",
        linha: "",
        descricao_req: "",
      });
    } catch (error) {
      alert("Erro do front ao enviar dados:", error.message); // Exibe um alerta em caso de erro no envio dos dados
    }
  };

  return (
    <div className={styles.bodyCriarOrdem}>
      <h1>Crie uma ordem de serviço</h1>
      <form className={styles.formCriaOrdem} onSubmit={handleSubmit}>
        <div className={styles.requisitante}>
          <label htmlFor="setor">Nome do requisitante:</label>
          <input 
            className={styles.inputCriarOrdem} 
            name="usuario_req" 
            placeholder="Digite o seu nome" 
            value={formData.usuario_req}
            onChange={handleChange} 
            required
          />

          <label htmlFor="setor">Setor do requisitante:</label>
          <input 
            className={styles.inputCriarOrdem} 
            name="setor" 
            placeholder="Digite o seu setor" 
            value={formData.setor}
            onChange={handleChange} 
            required
          />
        </div>
        <select 
          name="linha" 
          className={styles.selectCriaOrdem} 
          value={formData.linha} // Adicionado value para resetar o select
          onChange={handleChange}
        >
          <option value="">Selecione uma linha</option>
          {linhas ? linhas.map((req, index) => (
            <option key={index} value={req.nomeDaLinha}>{req.nomeDaLinha}</option>
          )) : ""}
        </select><br />
        <textarea 
          className={styles.descricaoReq} 
          type="text" 
          name="descricao_req" 
          value={formData.descricao_req} // Adicionado value para resetar a textarea
          onChange={handleChange}
          placeholder="Descreva o problema aqui..." 
          maxLength={255} 
          required
        />
        <button className={styles.ButtonCriarOrdem} type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default CriarOrdemForm; // Exporta o componente de formulário de criação de ordem
