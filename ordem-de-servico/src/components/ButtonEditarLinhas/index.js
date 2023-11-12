import styles from "../Header/index.module.css";

const ButtonEditarLinhas = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/editarLinhas"}>Editar linhas</button>
  )
}

export default ButtonEditarLinhas