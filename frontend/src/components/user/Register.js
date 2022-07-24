import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import postServices from '../../api/postServices';

function Register() {

    const [redirect, setRedirect] = useState(false)

    async function handleRegister(){
        let response = await registerUser()
        console.log(response)
        if(response.meta.status === 200){
            setRedirect(true)
        }
    }

    async function registerUser(){
        let firstName = document.getElementById("firstName").value
        let lastName = document.getElementById("lastName").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        let response = await postServices.registerUser({firstName, lastName, email, password});
        return response
    }

    function handleKeyDown(e){
        console.log("presionaste una tecla")
        if (e.key === 'Enter') {
            console.log("presionaste enter")
            handleRegister()
        }
    }

    return(
        <main className="d-flex align-items-center justify-content-center min-vh-100">
            {redirect && ( <Navigate to="/login" replace={true} />)}
            <div className="col-md-6 bg-light rounded shadow-sm my-3 p-2">
                <form>
                    <Form.Group className="mb-1">
                        <small>Nombre</small>
                        <Form.Control type="text" className="shadow-none" id="firstName" size="sm"/>
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <small>Apellido</small>
                        <Form.Control type="text" className="shadow-none" id="lastName" size="sm"/>
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <small>Email</small>
                        <Form.Control type="text" className="shadow-none" id="email" size="sm"/>
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <small>Contraseña</small>
                        <Form.Control  type="password" className="shadow-none" id="password" size="sm" onKeyPress={e => {if(e.key === 'Enter'){handleRegister()}}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                        <Link to='/login'><small>Login</small></Link>
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" onClick={handleRegister} >Registrarse</Button>
                    </div>
                </form>
            </div>
        </main>    
    )
}

export default Register