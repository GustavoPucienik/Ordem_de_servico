import React from 'react';
import styles from "../Header/index.module.css";
import { useNavigate } from 'react-router-dom';

function deslogar(navigate) {
  localStorage.removeItem('token');
  navigate("/ods");
}

const Button = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.buttonHeader} onClick={() => deslogar(navigate)}>Logout</button>
  );
}


export default Button;