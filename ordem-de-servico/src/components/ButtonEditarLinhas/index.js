import styles from "../Header/index.module.css";
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/editarlinhas');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Editar Linhas
    </button>
  );
}

export default Button