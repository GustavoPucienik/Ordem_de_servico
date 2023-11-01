import LogoWinner from "../../img/Logo.jpeg";
import styles from "./index.module.css";

const Logo = () => {
  return (
    <>
    <div>
      <img className={styles.imgLogo} src={LogoWinner} alt="Logo da empresa apwinner" />
    </div>
  </>
  )
}

export default Logo;
