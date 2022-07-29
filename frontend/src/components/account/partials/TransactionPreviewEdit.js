import React from 'react';
import Form from 'react-bootstrap/Form'
import { useParams } from "react-router-dom";

import { Button } from 'react-bootstrap';
import { Trash3 , PencilSquare, Save, XLg} from 'react-bootstrap-icons';


function TransactionPreviewEdit({transaction, categories, methods, editState, newState, cancelMethod, editMethod , editTransaction, newTransaction, deleteTransaction}){

    let { id } = useParams();

    function getFormData(formData){
        let accountId = id
        let name = document.getElementById('name').value
        let categoryId = document.getElementById('category').value
        let description = document.getElementById('description').value
        let methodId = document.getElementById('method').value
        let depOrWit = document.getElementById('depOrWit').value
        let amount = document.getElementById('amount').value
        if(depOrWit == 2){
            amount = -Math.abs(amount)
        }
        return {accountId, name, categoryId, description, methodId, amount}   
    }

    function handleSubmit(){
        let formData = {}
        if(transaction.id){
            formData = getFormData(formData);
            formData['id'] = transaction.id
            console.log(formData)
            editTransaction(formData)
        }else{
            formData = getFormData(formData);
            console.log(formData)
            newTransaction(formData)
        }
    }


    function handleDelete(){
        deleteTransaction({id: transaction.id})
    }

    
    if (transaction.amount < 0){
        transaction['depOrWit'] = 2
    }


    return (
        <React.Fragment>
            <div className="bg-light rounded shadow-sm my-3 p-2">
                <div className="d-flex justify-content-end"><Button variant="danger" className="rounded shadow-none p-1 d-flex align-items-center"  onClick={cancelMethod}> <XLg className="h6 m-0"/></Button></div>
                <form>
                    <Form.Group className="mb-1" controlId="nombre">
                        <small>Nombre</small>
                        <Form.Control type="text" defaultValue={transaction.name} size="sm" id="name" className="shadow-none" readOnly={(editState || newState) ? false : true } />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="categoria">
                        <small>Categoria</small>
                        <Form.Select aria-label="categorias" size="sm" id="category" className="shadow-none" defaultValue={transaction.categoryId.id} disabled={(editState || newState) ? false : true }>
                            {categories.map((props,index)=>{
                                return <option key={index} value={`${props.id}`}  selected={props.id ? props.id == transaction.categoryId ? true : false : false}>{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="medio">
                        <small>Medio</small>
                        <Form.Select aria-label="medios" size="sm" id="method" className="shadow-none" defaultValue={transaction.methodId.id} disabled={(editState || newState) ? false : true }>
                            {methods.map((props,index)=>{
                                return <option key={index} value={`${props.id}`}  selected={props.id ? props.id == transaction.methodId ? true : false : false}>{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="descripcion">
                        <small>Descripcion</small>
                        <Form.Control as="textarea" rows={2} size="sm" id="description" className="shadow-none" defaultValue={transaction.description} readOnly={(editState || newState) ? false : true }/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="monto">
                        <div className="row">
                            <div className="col-sm-4 pe-sm-1">
                                <small>Tipo</small>
                                <Form.Select aria-label="medios" size="sm" id="depOrWit" className="shadow-none" defaultValue={transaction.methodId.id} disabled={!newState}>
                                    <option key="1" value="1" >Deposito</option>
                                    <option key="2" value="2" selected={transaction.amount ? transaction.amount < 0  ? true : false : false}>Extraccion</option>
                                </Form.Select>
                            </div>
                            <div className="col-sm-8 ps-sm-1">
                                <small>Monto</small>
                                <Form.Control type="text" size="sm" id="amount" className="shadow-none" defaultValue={transaction.amount ? transaction.amount < 0  ? -transaction.amount : transaction.amount : transaction.amount} readOnly={(editState || newState) ? false : true }/>    
                            </div>
                        </div>                       
                    </Form.Group>
                    
                    {editState || newState ?
                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center"  onClick={handleSubmit}> <Save className="me-2"/> Guardar</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-between mt-2">
                        <Button variant="danger" className="rounded shadow-none p-1 px-2 me-2 d-flex align-items-center"  onClick={handleDelete}><Trash3 className="me-2"/>  Eliminar</Button>
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center"  onClick={editMethod}><PencilSquare className="me-2"/>Editar</Button>
                    </div>
                    }

                </form>

                
            </div>
        </React.Fragment>
    )
}

TransactionPreviewEdit.defaultProps = {transaction:{
    accountId: {id: 1},
    datetime: "",
    name: "",
    categoryId: {},
    methodId: {},
    description: "",
    amount:"",
}}






export default TransactionPreviewEdit;