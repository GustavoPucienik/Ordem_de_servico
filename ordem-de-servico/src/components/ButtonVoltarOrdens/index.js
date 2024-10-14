import styles from "../Header/index.module.css";
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/ordens');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Voltar
    </button>
  );
}

export default Button;