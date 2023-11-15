import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import verificacaoUsuarioManutencao from '../../middlewares/checkaUsuarioManutencao';

const URLlinha = `${API_BASE_URL}/linha`;

const EditarLinhas = () => {
  const [linhas, setLinhas] = useState([]);
  const [linha, setLinha] = useState({});
  verificacaoUsuarioManutencao();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URLlinha);
        setLinhas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const definirLinha = (e) => {
    const { name, value } = e.target;
    setLinha((prevLinha) => ({ ...prevLinha, [name]: value }));
  };

  const inserirLinha = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URLlinha, linha);
      const response = await axios.get(URLlinha);
      setLinhas(response.data);
    } catch (error) {
      console.error('Erro ao inserir linha:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URLlinha}/${id}`);
      const updatedLinhas = linhas.filter((l) => l.id !== id);
      setLinhas(updatedLinhas);
    } catch (error) {
      console.error('Erro ao deletar linha:', error);
    }
  };

  return (
    <div className={styles.bodyEditarlinhas}>
      <form className={styles.formulario} onSubmit={inserirLinha}>
        <input
          type="text" required
          name="nomeDaLinha"
          placeholder="Insira aqui uma nova linha"
          onChange={definirLinha}
        />
        <button className={styles.buttonsLinhas} type="submit">Inserir</button>
      </form>
      <ul className={styles.listaLinhas}>
        {linhas.map((res, i) => (
          <li className={styles.listaPorLinha} key={i}>
            <p>{res.nomeDaLinha}</p>
            <div className={styles.buttons}>
              <button className={styles.buttonsLinhas}>Editar</button>
              <button className={styles.buttonsLinhas} onClick={() => handleDelete(res.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditarLinhas