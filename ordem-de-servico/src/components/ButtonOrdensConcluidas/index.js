import styles from "../Header/index.module.css";
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/ordensconcluidas');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Ordens Concluidas
    </button>
  );
}

export default Button;