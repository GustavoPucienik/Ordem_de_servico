import React from 'react';
import styles from "./index.module.css";
import Header from '../Header';
import CadastroForm from '../CadastroFormulario';

const Cadastro = () => {

  return (
    <>
      <Header nome="cadastrar"/>
      <div className={styles.bodyCadastro}>
        <div className={styles.formularioCadastro}>
          <h1 className={styles.tituloCadastro}>Cadastro</h1>
          <CadastroForm/>
        </div>
      </div>
    </>
  )
}

export default Cadastro;