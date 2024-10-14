import styles from "../Header/index.module.css"
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/criarOrdem');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Criar Ordem
    </button>
  );
}

export default Button;