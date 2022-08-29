import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button } from 'react-bootstrap';
import postServices from '../../api/postServices';


function Register() {

    const [redirect, setRedirect] = useState(false)

    const validation = yup.object().shape({
        firstName: yup.string().required("Obligatorio"),
        lastName: yup.string().required("Obligatorio"),
        email: yup.string().required("Obligatorio")
            .email("El email es invalido")
            .test('checkEmailUnique', 'Este email ya esta registrado', async (value) =>{
                let email = value ? value : '' 
                let response = await postServices.checkEmail({email})
                return !response.data.emailExist
            }),
        password: yup.string()
            .matches(/^(?=.*[a-z])(?=.{8,100})(?=.*\d).{8,100}$/, {message: "La contraseña debe tener al menos 8 caracteres y contener numeros y/o caracteres especiales"})
            .required("Obligatorio"),
        confirmPassword: yup.string()
            .matches(/^(?=.*[a-z])(?=.{8,100})(?=.*\d).{8,100}$/, {message: "La contraseña debe tener al menos 8 caracteres y contener numeros y/o caracteres especiales"})
            .oneOf([yup.ref('password'), null], "Las contraseñas no coinciden")
            .required("Obligatorio")
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email:'',
            password: '',
            confirmPassword:''
        },
        onSubmit: async (values)=>{
            let response = await postServices.registerUser(values)
            console.log(errors)
            if(response.meta.status === 200){
                setRedirect(true)
            }
        },
        validationSchema: validation,
        validateOnBlur : validation
    })


    return(
        <main className="d-flex align-items-center justify-content-center min-vh-100">
            {redirect && ( <Navigate to="/login" replace={true} />)}
            <div className="col-md-6 bg-light rounded shadow-sm my-3 p-2">

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-1" controlId="firstName">
                        <small>Nombre</small>
                        <Form.Control type="text" name="firstName" value={values.firstName} className="shadow-none" size="sm" onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.firstName && touched.firstName}/>
                        <Form.Control.Feedback type="invalid">{errors.firstName && touched.firstName ? errors.firstName : ''}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="lastName">
                        <small>Apellido</small>
                        <Form.Control type="text" name="lastName" value={values.lastName} className="shadow-none" size="sm" onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.lastName && touched.lastName}/>
                        <Form.Control.Feedback type="invalid">{errors.lastName && touched.lastName ? errors.lastName : ''}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="email">
                        <small>Email</small>
                        <Form.Control type="text" name="email" value={values.email} className="shadow-none" size="sm" onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.email && touched.email}/>
                        <Form.Control.Feedback type="invalid">{errors.email && touched.email ? errors.email : ''}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="password">
                        <small>Contraseña</small>
                        <Form.Control  type="password" name="password" value={values.password} className="shadow-none" size="sm" onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.password && touched.password}/>
                        <Form.Control.Feedback type="invalid">{errors.password && touched.password ? errors.password : ''}</Form.Control.Feedback>
                    </Form.Group>                    
                    <Form.Group className="mb-1" controlId="confirmPassword">
                        <small>Confirmar contraseña</small>
                        <Form.Control type="password" name="confirmPassword" value={values.confirmPassword} className="shadow-none" size="sm" onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.confirmPassword && touched.confirmPassword}/>
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                        <Link className="ms-3" to='/login'><small>Login</small></Link>
                        <Button  type="submit" variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" disabled={isSubmitting}>Registrarse</Button>
                    </div>
                </Form>

            </div>
        </main>    
    )
}

export default Register