import React from 'react'

function deslogar(){
  localStorage.removeItem('token');
  window.location = "/";
}


const Button = () => {
  return (
    <button className='button-header' onClick={deslogar}>Logout</button>
  )
}

export default Button;