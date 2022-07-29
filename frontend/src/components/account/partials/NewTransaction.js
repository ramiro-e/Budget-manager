import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

function NewTransaction({newMethod}){

    function handleClick(){
        newMethod(undefined)
    }
    
    return(
        <React.Fragment>
            <div className="mt-1 pt-2">
                <div>
                    <Button variant="primary" className="d-flex align-items-center justify-content-center rounded p-0 px-3 py-1 shadow-none w-100"  onClick={handleClick}> <h5 className="mb-1">NUEVA TRANSACCION</h5><PencilSquare className="p-0 m-0 ms-2 h5"/></Button>
                </div>
            </div>
        </React.Fragment>
    )
}


export default NewTransaction;