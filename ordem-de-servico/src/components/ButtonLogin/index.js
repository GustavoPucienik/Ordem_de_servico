import styles from "../Header/index.module.css"
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ods/login');
  };

  return (
    <button className={styles.buttonHeader} onClick={handleClick}>
      Login
    </button>
  );
}
export default Button;
