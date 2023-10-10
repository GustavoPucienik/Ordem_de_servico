import React from 'react'

function vaipratelaHome(){
  window.location = "/";
}


const Button = () => {
  return (
    <button className='button-header' onClick={vaipratelaHome}>Voltar</button>
  )
}

export default Button;
