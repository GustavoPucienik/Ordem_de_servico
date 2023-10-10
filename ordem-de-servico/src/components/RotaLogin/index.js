import React from 'react'
import Header from '../Header';
import LoginForm from '../LoginFormulario';
import "../LoginFormulario/index.css";

const Login = () => {
  return (
    <>
      <Header nome="login"/>
      <div className='body-login'>
        <div className='formulario-login'>
          <h1 className='titulo-login'>Login</h1>
            <LoginForm/>
        </div>
      </div>
    </>
  )
}

export default Login;