import styles from "./index.module.css";
import Banner from "../../img/banner.jpg"
import Header from '../Header';

const Home = () => {
  return (
    <>
    <Header nome="home"/>
    <div className={styles.imagemContainer}>
      <img className={styles.imagemLarguraTotal} src={Banner} alt="foto da apwinner" />
      <h1 className={styles.textoHome}> Sistema de ordens de serviço manutenção</h1>
    </div>
    </>
  )
}

export default Home;
