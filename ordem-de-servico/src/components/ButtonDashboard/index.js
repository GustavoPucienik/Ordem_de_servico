import styles from "../Header/index.module.css";

const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/perfil" }>Voltar</button>
  )
}

export default Button;