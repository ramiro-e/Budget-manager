import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import postServices from '../../api/postServices';



function Login({setLoginToken}) {

  const [redirect, setRedirect] = useState(false)
  
  async function handleLogin(){
    let response = await loginUser()
    console.log(response)

    if(response.meta.status === 200){
      setLoginToken(response.token)
      setRedirect(true)
    }

  }

  async function loginUser(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    let response = await postServices.loginUser({email, password});
    return response
  }
  

  return(
    <main className="d-flex align-items-center justify-content-center min-vh-100">
        {redirect && ( <Navigate to="/" replace={true} />)}
        <div className="col-md-6 bg-light rounded shadow-sm my-3 p-2">
            <form>
                <Form.Group className="mb-1">
                    <small>Email</small>
                    <Form.Control type="text" className="shadow-none" id="email" size="sm" />
                </Form.Group>
                <Form.Group className="mb-1">
                    <small>Contraseña</small>
                    <Form.Control  type="password" className="shadow-none" id="password" size="sm" onKeyPress={e => {if(e.key === 'Enter'){handleLogin()}}}/>
                </Form.Group>
                <div className="d-flex justify-content-between mt-2">
                    <Link to='/register'><small>Registrarse</small></Link>
                    <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" onClick={handleLogin}>Entrar</Button>
                </div>
            </form>
        </div>
    </main>
    
  )
}

export default Login