import styles from "../Header/index.module.css"
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const vaipratelaHome = () => {
    navigate("/ods");
  };

  return (
    <button className={styles.buttonHeader} onClick={vaipratelaHome}>Voltar</button>
  );
}

export default Button;
