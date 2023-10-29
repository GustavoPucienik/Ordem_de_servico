import "./index.css";
import Logo from "../Logo";
import ButtonLogin from "../ButtonLogin";
import ButtonCadastro from "../ButtonCadastro";
import ButtonVoltar from "../ButtonVoltar";
import ButtonLogout from "../ButtonLogout";
import ButtonCriaOrdem from "../ButtonCriaOrdem";
import ButtonDashboard from "../ButtonDashboard";

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
        {rota.nome === "perfil"?
        <div>
          <ButtonCriaOrdem/>
          <ButtonLogout/>
        </div>
        : null}
        {rota.nome === "criarOrdem"?
        <div>
          <ButtonDashboard/>
          <ButtonLogout/>
        </div>
        : null}
        {rota.nome === "ordens-req"?
        <div>
          <ButtonDashboard/>
          <ButtonLogout/>
        </div>
        : null}
      
    </div>
  </>
  )
}

export default Header;