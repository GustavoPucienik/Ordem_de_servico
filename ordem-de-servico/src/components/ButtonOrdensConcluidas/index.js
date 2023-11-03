import styles from "../Header/index.module.css";

const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/ordensconcluidas" }>Ordens</button>
  )
}

export default Button;