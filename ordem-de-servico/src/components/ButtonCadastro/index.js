import React from 'react'

function vaiprateladeCadastro(){
  window.location = "/cadastrar";
}

const Button = () => {
  return (
    <button className='button-header' onClick={vaiprateladeCadastro}>Cadastro</button>
  )
}

export default Button;
