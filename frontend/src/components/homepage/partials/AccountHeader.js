import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import postServices from '../../../api/postServices';
import { Button } from 'react-bootstrap';
import { Plus, BoxArrowRight } from 'react-bootstrap-icons';

function AccountHeader({setModalShow}){

    const [redirect, setRedirect] = useState(false)
    function handleLogout(){
        localStorage.removeItem('loginToken');
        setRedirect(true)
    }

    return (
        <React.Fragment>
            {redirect && ( <Navigate to="/login" replace={true} />)}
            <div className="pt-2">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <h3 className="m-0 ms-1 me-3" >Cuentas</h3>
                        <Button className="rounded shadow-none p-0 d-flex align-items-center" onClick={()=>{setModalShow(true)}}><Plus className="h2 m-0"/></Button>
                    </div>
                    <div>
                        <Button className="rounded shadow-none py-1 px-2 d-flex align-items-center" onClick={handleLogout}> <span>Cerrar Sesion</span> <BoxArrowRight className="h5 m-0 ms-2"/></Button>
                    </div>
                </div>              
            </div>
        </React.Fragment>
    )
}

export default AccountHeader;