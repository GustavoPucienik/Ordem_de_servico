import styles from "../Header/index.module.css"
function vaiprateladeCadastro(){
  window.location = "/cadastrar";
}

const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={vaiprateladeCadastro}>Cadastro</button>
  )
}

export default Button;
