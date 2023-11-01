import styles from "../Header/index.module.css"

const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/criarOrdem"}>Criar ordem</button>
  )
}

export default Button;