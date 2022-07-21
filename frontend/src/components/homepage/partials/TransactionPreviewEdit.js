import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { Trash3 , PencilSquare, Save, XLg} from 'react-bootstrap-icons';




function TransactionPreviewEdit({transaction, editState, newState, cancelMethod, editMethod}){


    if (transaction.amount < 0){
        transaction['depOrWit'] = 2
    }

    return (
        <React.Fragment>
            <div className="bg-light rounded shadow-sm mt-3 p-2">
                <div className="d-flex justify-content-end"><Button variant="danger" className="rounded shadow-none p-1 d-flex align-items-center"  onClick={cancelMethod}> <XLg className="h6 m-0"/></Button></div>
                <form>
                    <Form.Group className="mb-1">
                        <small>Cuenta</small>
                        <Form.Select aria-label="cuentas" className="shadow-none" id="account" defaultValue={transaction.accountId} disabled={!newState} size="sm">
                            {accounts.map((props,index)=>{
                                return <option key={index} value={`${props.id}`} selected={props.id ? props.id == transaction.accountId ? true : false : false}> {props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <small>Nombre</small>
                        <Form.Control type="text" defaultValue={transaction.name} className="shadow-none" id="name" readOnly={(editState || newState) ? false : true } size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <small>Categoria</small>
                        <Form.Select aria-label="categorias" className="shadow-none" id="category" defaultValue={transaction.categoryId} disabled={(editState || newState) ? false : true } size="sm">
                            {categories.map((props,index)=>{
                                return <option key={index} value={`${props.id}`} selected={props.id ? props.id == transaction.categoryId ? true : false : false} >{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <small>Medio</small>
                        <Form.Select aria-label="medios" className="shadow-none" id="method" defaultValue={transaction.methodId} disabled={(editState || newState) ? false : true } size="sm">
                            {methods.map((props,index)=>{
                                return <option key={index} value={`${props.id}`} selected={props.id ? props.id == transaction.methodId ? true : false : false} >{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <small>Descripcion</small>
                        <Form.Control as="textarea" rows={2} className="shadow-none" id="description" defaultValue={transaction.description} readOnly={(editState || newState) ? false : true } size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <div className="row">
                            <div className="col-sm-4 pe-sm-1">
                                <small>Tipo</small>
                                <Form.Select aria-label="medios" size="sm" id="depOrWit" className="shadow-none" defaultValue={transaction.methodId} disabled={!newState}>
                                    <option key={1} value={1} >Deposito</option>
                                    <option key={2} value={2} selected={transaction.amount ? transaction.amount < 0  ? true : false : false}>Extraccion</option>
                                </Form.Select>
                            </div>
                            <div className="col-sm-8 ps-sm-1">
                                <small>Monto</small>
                                <Form.Control type="text" size="sm" id="amount" className="shadow-none" defaultValue={transaction.amount ? transaction.amount < 0  ? -transaction.amount : transaction.amount : transaction.amount} readOnly={(editState || newState) ? false : true}/>
                            </div>
                        </div>                       
                    </Form.Group>

                    {editState || newState ?
                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" > <Save className="me-2"/> Guardar</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-between mt-2">
                        <Button variant="danger" className="rounded shadow-none p-1 px-2 me-2 d-flex align-items-center" ><Trash3 className="me-2"/>  Eliminar</Button>
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center"  onClick={editMethod}><PencilSquare className="me-2"/>Editar</Button>
                    </div>
                    }

                </form>

                
            </div>
        </React.Fragment>
    )
}

TransactionPreviewEdit.defaultProps = {transaction:{
    accountId:{},
    datetime: "",
    name: "",
    categoryId: {},
    methodId: {},
    description: "",
    amount:"",
}}






export default TransactionPreviewEdit;