import styles from "../Header/index.module.css";
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/perfil');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Perfil
    </button>
  );
}

export default Button;