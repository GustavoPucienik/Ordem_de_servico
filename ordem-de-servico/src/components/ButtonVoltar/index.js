import styles from "../Header/index.module.css"

function vaipratelaHome(){
  window.location = "/";
}


const Button = () => {
  return (
    <button className={styles.buttonHeader} onClick={vaipratelaHome}>Voltar</button>
  )
}

export default Button;
