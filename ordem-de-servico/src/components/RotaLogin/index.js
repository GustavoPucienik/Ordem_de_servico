import React from 'react'
import Header from '../Header';
import LoginForm from '../LoginFormulario';
import styles from "../LoginFormulario/index.module.css";

const Login = () => {
  return (
    <>
      <Header nome="login"/>
      <div className={styles.bodyLogin}>
        <div className={styles.formularioLogin}>
          <h1 className={styles.tituloLogin}>Login</h1>
            <LoginForm/>
        </div>
      </div>
    </>
  )
}

export default Login;