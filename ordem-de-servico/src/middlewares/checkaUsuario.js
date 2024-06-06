import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Função de ordem superior (HOC) que verifica se o usuário está autenticado
const verificaUsuario = (WrappedComponent) => {
  // Retorna um novo componente
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Verifica se há um token no localStorage
      const token = localStorage.getItem('token');
      // Se não houver token, redireciona para a página de login
      if (!token) {
        alert("Faça o login, usuário não autenticado!");
        navigate('/login');
      }
    }, [navigate]); // O efeito depende de 'navigate'

    // Retorna o componente original com todas as props recebidas
    return <WrappedComponent {...props} />;
  };
};

export default verificaUsuario;
