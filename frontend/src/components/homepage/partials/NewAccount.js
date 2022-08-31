import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import postServices from '../../../api/postServices';

function NewAccount({setModalShow, updateStates}) {

    async function handleSaveAccount(){
        let accountName = document.getElementById('accountName').value
        let response = await postServices.newAccount({name: accountName})
        if (response === 200){
            setModalShow(false)
            updateStates()
        }
    }

    return(

        <div className="bg-light rounded p-2">
            <h4>Nueva Cuenta</h4>
            <form>
                <Form.Group className="mb-1">
                    <small>Nombre</small>
                    <Form.Control type="text" className="shadow-none" id="accountName" size="sm"/>
                </Form.Group>
                
                <div className="d-flex justify-content-between mt-2">
                    <Button variant="secondary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" onClick={()=>{setModalShow(false)}}>Cancelar</Button>
                    <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" onClick={handleSaveAccount} >Añadir</Button>
                </div>
            </form>
        </div>

    )
}

export default NewAccount