import { useNavigate } from 'react-router-dom';// Hook do react-router-dom para navegação
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import verificacaoUsuarioManutencao from '../../middlewares/checkaUsuarioManutencao';

// URL para acessar os dados da linha
const URLlinha = `${API_BASE_URL}/linha`;

const EditarLinhas = () => {
  const [linhas, setLinhas] = useState([]);// Estado para armazenar as linhas existentes
  const [linha, setLinha] = useState({});// Estado para armazenar a nova linha a ser inserida
  const history = useNavigate(); // Hook do react-router-dom para navegação

  // Verifica se o usuário já está logado ao montar o componente
  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Faça o login");
    history('/ods/login'); // Redireciona para o login se não houver token
  }
  }, [history]);

  // Obtém as linhas existentes ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URLlinha);
        setLinhas(response.data); // Armazena as linhas obtidas no estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Função para definir a nova linha a ser inserida
  const definirLinha = (e) => {
    const { name, value } = e.target;
    setLinha((prevLinha) => ({ ...prevLinha, [name]: value }));
  };

  // Função para inserir uma nova linha
  const inserirLinha = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URLlinha, linha); // Insere a nova linha
      const response = await axios.get(URLlinha); // Obtém as linhas atualizadas
      setLinhas(response.data); // Atualiza o estado com as linhas atualizadas
    } catch (error) {
      console.error('Erro ao inserir linha:', error);
    }
  };

  // Função para deletar uma linha existente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URLlinha}/${id}`);// Deleta a linha especificada
      const updatedLinhas = linhas.filter((l) => l.id !== id);// Remove a linha deletada do estado
      setLinhas(updatedLinhas);// Atualiza o estado com as linhas restantes
    } catch (error) {
      console.error('Erro ao deletar linha:', error);
    }
  };

  return (
    <div className={styles.bodyEditarlinhas}>
      <h1>Mudar linhas</h1>
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
              <button className={styles.buttonsLinhas} onClick={() => handleDelete(res.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta o componente com a verificação de usuário
export default verificacaoUsuarioManutencao(EditarLinhas);