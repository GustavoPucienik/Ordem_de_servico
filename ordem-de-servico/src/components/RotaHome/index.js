import "./index.css"
import Banner from "../../img/banner.jpg"
import Header from '../Header';

const Home = () => {
  return (
    <>
    <Header nome="home"/>
    <div className="imagem-container">
      <img className="imagem-largura-total" src={Banner} alt="foto da apwinner" />
      <h1 className="texto-home"> Sistema de ordens de serviço manutenção</h1>
    </div>
    </>
  )
}

export default Home;
