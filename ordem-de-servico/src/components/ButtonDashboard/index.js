import React from 'react'

function vaipraRotaPerfil(){
  window.location = "/perfil";
}


const Button = () => {
  return (
    <button className='button-header' onClick={vaipraRotaPerfil}>Voltar</button>
  )
}

export default Button;