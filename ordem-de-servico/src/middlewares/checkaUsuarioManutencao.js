import axios from "axios";
import { API_BASE_URL } from '../config';

const URLPegaDados = `${API_BASE_URL}/dadosusuario`;

  const verificacaoUsuarioManutencao = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(URLPegaDados, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.setor !== ("Manutenção" || "manutenção")) {
        alert("Pagina não autorizada");
        window.location = "/perfil"
    }} catch (error) {
      alert("Erro ao buscar dados do usuário. Você sera redirecionado!", error);
      window.location = "/login";
    }
  };

  export default verificacaoUsuarioManutencao;