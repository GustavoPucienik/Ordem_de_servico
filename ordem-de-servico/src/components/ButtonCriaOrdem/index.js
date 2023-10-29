import React from 'react'

function vaiprateladeCriarOrdem(){
  window.location = "/criarOrdem";
}


const Button = () => {
  return (
    <button className='button-header' onClick={vaiprateladeCriarOrdem}>Criar ordem</button>
  )
}

export default Button;