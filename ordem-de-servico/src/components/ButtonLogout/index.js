import React from 'react';
import styles from "../Header/index.module.css";


function deslogar(){
  localStorage.removeItem('token');
  window.location = "/";
}


const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={deslogar}>Logout</button>
  )
}

export default Button;