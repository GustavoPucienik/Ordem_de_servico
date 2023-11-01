import styles from "../Header/index.module.css";

const ButtonVoltarOrdens = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/ordens"}>Voltar</button>
  )
}

export default ButtonVoltarOrdens