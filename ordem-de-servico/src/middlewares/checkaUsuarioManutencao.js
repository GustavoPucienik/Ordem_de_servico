import axios from "axios";
import { API_BASE_URL } from '../config';

// URL para pegar dados do usuário
const URLPegaDados = `${API_BASE_URL}/dadosusuario`;

// Função para verificar se o usuário pertence ao setor de manutenção
  const verificacaoUsuarioManutencao = async () => {
    try {
      // Obtém o token do localStorage
      const token = localStorage.getItem('token');

      // Faz uma solicitação para obter os dados do usuário
      const response = await axios.get(URLPegaDados, {
        headers: {
          Authorization: `Bearer ${token}`,// Adiciona o token no cabeçalho da requisição
        }
      });
      // Verifica se o setor do usuário é "manutenção"
      if (response.data.setor.toLowerCase() !== ("manutenção" || "manutencao")) {
        alert("Pagina não autorizada!");
        window.location = "/perfil"; // Redireciona para o perfil se o setor não for manutenção
    }} catch (error) {
      // Em caso de erro, exibe uma mensagem e redireciona para a página de login
      alert("Erro ao buscar dados do usuário. Você sera redirecionado!", error);
      window.location = "/login";
    }
  };

  export default verificacaoUsuarioManutencao;