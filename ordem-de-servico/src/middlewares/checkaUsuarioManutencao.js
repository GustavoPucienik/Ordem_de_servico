import React, { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';
import { useNavigate } from "react-router-dom"; // Hook do react-router-dom para navegação

// URL para pegar dados do usuário
const URLPegaDados = `${API_BASE_URL}/dadosusuario`;

// Função para verificar se o usuário pertence ao setor de manutenção
const verificacaoUsuarioManutencao = (WrappedComponent) => {
  // Retorna um novo componente
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Obtém o token do localStorage
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error("Token não encontrado");
          }

          // Faz uma solicitação para obter os dados do usuário
          const response = await axios.get(URLPegaDados, {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
            },
          });

          // Verifica se o setor do usuário é "manutenção"
          const userSector = response.data.setor.toLowerCase();
          if (userSector !== "manutenção" && userSector !== "manutencao") {
            alert("Página não autorizada!");
            navigate("/ods/perfil"); // Redireciona para o perfil se o setor não for manutenção
          }
        } catch (error) {
          // Em caso de erro, exibe uma mensagem e redireciona para a página de login
          alert("Erro ao buscar dados do usuário. Você será redirecionado!");
          console.error("Erro ao buscar dados do usuário:", error);
          navigate("/ods/login");
        }
      };

      fetchUserData();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default verificacaoUsuarioManutencao;
