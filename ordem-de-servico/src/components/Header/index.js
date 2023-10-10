import "./index.css";
import Logo from "../Logo"
import ButtonLogin from "../ButtonLogin";
import ButtonCadastro from "../ButtonCadastro";
import ButtonVoltar from "../ButtonVoltar";

const Header = (rota) => {
  return (
  <>
    <div className="Header">
      <Logo/>
        {rota.nome === "home"?
        <div>
          <ButtonLogin/>
          <ButtonCadastro/>
        </div>
        : null}
        {rota.nome === "login"?
        <div>
          <ButtonCadastro/>
          <ButtonVoltar/>
        </div>
        : null}
        {rota.nome === "cadastrar"?
        <div>
          <ButtonLogin/>
          <ButtonVoltar/>
        </div>
        : null}
      
    </div>
  </>
  )
}

export default Header;