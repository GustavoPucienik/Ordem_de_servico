import React from 'react'

function vaiprateladeLogin(){
  window.location = "/login";
}


const Button = () => {
  return (
    <button className='button-header' onClick={vaiprateladeLogin}>Login</button>
  )
}

export default Button;
