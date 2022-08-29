import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button } from 'react-bootstrap';
import postServices from '../../api/postServices';



function Login({setLoginToken}) {

  const [redirect, setRedirect] = useState(false)

    const validation = yup.object().shape({
        email: yup.string().required("Debe ingresar un email")
            .test('checkEmailUnique', 'Este email no esta registrado', async (value) =>{
                let email = value ? value : '' 
                let response = await postServices.checkEmail({email})
                return response.data.emailExist
            }),
        password: yup.string()
            .required("Debe ingresar una contraseña"),
    });

    const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            email:'',
            password: ''
        },
        onSubmit: async (values)=>{
            let response = await postServices.loginUser(values)
            console.log(errors)
            if(response.meta.status === 200){
				setLoginToken(response.token)
				setRedirect(true)
            }
        },
        validationSchema: validation,
    })


	return(
    <main className="d-flex align-items-center justify-content-center min-vh-100">
        {redirect && ( <Navigate to="/" replace={true} />)}
        <div className="col-md-6 bg-light rounded shadow-sm my-3 p-2">
            <Form  onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="email">
                    <small>Email</small>
                    <Form.Control type="text" name="email" value={values.email} className="shadow-none" size="sm" onChange={handleChange} isInvalid={!!errors.email && touched.email} />
                    <Form.Control.Feedback type="invalid">{errors.email && touched.email ? errors.email : ''}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="password">
                    <small>Contraseña</small>
                    <Form.Control  type="password" name="password" value={values.password} className="shadow-none" size="sm" onChange={handleChange} isInvalid={!!errors.password && touched.password} onKeyPress={e=>{if(e.key==='Enter'){handleSubmit()}}}/>
                    <Form.Control.Feedback type="invalid">{errors.password && touched.password ? errors.password : ''}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between mt-2">
                    <Link to='/register'><small>Registrarse</small></Link>
                    <Button type="submit" variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" disabled={isSubmitting}>Entrar</Button>
                </div>
            </Form>
        </div>
    </main>
    
  )
}

export default Login