import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';

function Register() {

    return(
        <main className="d-flex align-items-center justify-content-center min-vh-100">
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
                        <Form.Control  type="password" className="shadow-none" id="password" size="sm" />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                        <Link to='/login'><small>Login</small></Link>
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center"  >Registrarse</Button>
                    </div>
                </form>
            </div>
        </main>    
    )
}

export default Register