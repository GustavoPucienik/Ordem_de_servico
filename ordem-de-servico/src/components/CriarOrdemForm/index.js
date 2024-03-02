import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;
const URLCadastraOrdem = `${API_BASE_URL}/ordens`;
const URLPegaLinhas = `${API_BASE_URL}/linha`

const CriarOrdemForm = () => {
  const [linhas, setLinhas] = useState([]);
  const [formData, setFormData] = useState({
    usuario_req: null,
    setor: null,
    linha: "",
    descricao_req: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(URLPegaDados, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setFormData({
          ...formData,
          usuario_req: response.data.nome, // Define o valor do campo usuario_req
          setor: response.data.setor, // Define o valor do campo setor
        });
      } catch (error) {
        alert( error);
        window.location = "/login";
      }
      try {
        const linhasRes = await axios.get(URLPegaLinhas)
        setLinhas(linhasRes.data);
      } catch (error) {
        alert( error);
      }
    };
    fetchData();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URLCadastraOrdem, formData, { headers: { "Content-Type": "application/json" }});
      if (response.data.msgErro) {
        return alert(response.data.msgErro)
      }
      alert(response.data.msg);
      setTimeout(() => {
        alert("Você sera redirecionado!")
        window.location = "/perfil"
      },1500)
    } catch (error) {
      alert("Erro do front ao enviar dados:", error);
    }
  };

  return (
    <div className={styles.bodyCriarOrdem}>
      <h1>Crie uma ordem de serviço</h1>
      <form className={styles.formCriaOrdem} onSubmit={handleSubmit}>
      <input className={styles.inputCriarOrdem} name="usuario_req" readOnly value={formData.usuario_req}
      onChange={handleChange}/><br/>
      <input className={styles.inputCriarOrdem} name="setor" readOnly value={formData.setor}
      onChange={handleChange}/><br/>
        <select name="linha" className={styles.selectCriaOrdem} onChange={handleChange}>
        <option value="">Selecione uma linha</option>
          {linhas? linhas.map((req, index) => (
            <option value={req.nomeDaLinha}>{req.nomeDaLinha}</option>
          )) : ""}
        </select><br />
        <textarea className={styles.descricaoReq} type="text" name="descricao_req" onChange={handleChange}
        placeholder="Descreva o problema aqui..." maxLength={255} required/>
        <button className={styles.ButtonCriarOrdem} type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default CriarOrdemForm;