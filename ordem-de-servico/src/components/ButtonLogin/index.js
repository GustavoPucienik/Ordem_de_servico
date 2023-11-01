import styles from "../Header/index.module.css"

const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={() => window.location = "/login"}>Login</button>
  )
}

export default Button;
