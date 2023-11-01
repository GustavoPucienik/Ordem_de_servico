import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import axios from "axios";
import { API_BASE_URL } from '../../config';

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;
const URLCadastraOrdem = `${API_BASE_URL}/criarOrdem`;

const CriarOrdemForm = () => {
  const [dados, setDados] = useState(null);
  const [formData, setFormData] = useState({
    usuario_req: null,
    setor: null,
    linha: "",
    descricao_req: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const token = localStorage.getItem('token');
        axios.get(URLPegaDados, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(function (response){
        setDados(response.data);
        setFormData({
          ...formData,
          usuario_req: response.data.nome, // Define o valor do campo usuario_req
          setor: response.data.setor, // Define o valor do campo setor
        });
        })
        .catch((error) => console.alert(error));
        return () => controller.abort()
      } catch (error) {
        alert("Erro ao buscar dados do usuário. Você sera redirecionado!", error);
        window.location = "/login";
      }
    };
    fetchData();
  }, []);

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
      await axios.post(URLCadastraOrdem, formData, { headers: { "Content-Type": "application/json" }});
      alert(`Ordem de serviço cadastrada com sucesso!`);
      window.location = "/Perfil"
    } catch (error) {
      alert("Erro ao enviar dados:", error);
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
          <option selected value="">Selecione a linha</option>
          <option value="Blistagem">Blistagem</option>
          <option value="Arla">Arla</option>
          <option value="Nannini">Nannini</option>
          <option value="Tecnoenvase">Tecnoenvase</option>
          <option value="Serac">Serac</option>
          <option value="Bosch">Bosch</option>
          <option value="Multiuso">Multiuso</option>
          <option value="Horse">Horse</option>
          <option value="Kalix">Kalix</option>
          <option value="LPB">LPB</option>
          <option value="Terco 1">Terco 1</option>
          <option value="Terco 2">Terco 2</option>
          <option value="Una 1">Una 1</option>
          <option value="Una 2">Una 2</option>
          <option value="Promaquina">Promaquina</option>
          <option value="Sache">Sache</option>
          <option value="Cósméticos">Cósméticos</option>
          <option value="Manual">Manual</option>
          <option value="Manual 200L / 100L">Manual 200L / 100L</option>
          <option value="Montagem de kit">Montagem de kit</option>
          <option value="Dosagem grafite">Dosagem grafite</option>
          <option value="Dosagem selante">Dosagem selante</option>
          <option value="Dosagem graxa">Dosagem graxa</option>
        </select><br />
        <textarea className={styles.descricaoReq} type="text" name="descricao_req" onChange={handleChange}
        placeholder="Descreva o problema aqui..." />
        <button className={styles.ButtonCriarOrdem} type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default CriarOrdemForm;