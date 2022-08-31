import React, {useEffect}from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Trash3 , PencilSquare, Save, XLg} from 'react-bootstrap-icons';




function TransactionPreviewEdit({transaction, accounts, categories, methods, editState, newState, cancelMethod, editMethod, editTransaction, newTransaction, deleteTransaction}){


    const validation = yup.object().shape({
        accountId:yup.string().required("Obligatorio"),
        name:yup.string().required("Obligatorio"),
        categoryId:yup.string().required("Obligatorio"),
        methodId:yup.string().required("Obligatorio"),
        description:yup.string().required("Obligatorio"),
        depOrWit:yup.string().required("Obligatorio"),
        amount:yup.string().required("Obligatorio")
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setValues } = useFormik({
        initialValues: transaction,
        onSubmit: async (values)=>{
            if(values.depOrWit == 2){
                values.amount = -Math.abs(values.amount)
            }
            if(values.id){
                editTransaction(values)
            }else{
                newTransaction(values)
            }
        },
        validationSchema: validation,
        validateOnBlur : validation
    })

    useEffect( ()=> {
        transaction.amount < 0 ? transaction.depOrWit = 2 : transaction.depOrWit = 1
        setValues(transaction)
    },[transaction])

    function handleDelete(){
        deleteTransaction({id: transaction.id})
    }

    return (
        <React.Fragment>
            <div className="bg-light rounded shadow-sm mt-3 p-2">
                <div className="d-flex justify-content-end"><Button variant="danger" className="rounded shadow-none p-1 d-flex align-items-center"  onClick={cancelMethod}> <XLg className="h6 m-0"/></Button></div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-1" controlId="accountId">
                        <small>Cuenta</small>
                        <Form.Select aria-label="cuentas" className="shadow-none" name="accountId" value={values.accountId}  onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.accountId && touched.accountId} disabled={!newState} size="sm">
                            {accounts.map((props,index)=>{
                                return <option key={index} value={props.id} selected={props.id ? props.id == values.accountId ? true : false : false}> {props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="name">
                        <small>Nombre</small>
                        <Form.Control type="text" className="shadow-none" name="name" value={values.name} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.name && touched.name} readOnly={(editState || newState) ? false : true } size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="categoryId">
                        <small>Categoria</small>
                        <Form.Select aria-label="categorias" className="shadow-none" name="categoryId" value={values.categoryId}  onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.categoryId && touched.categoryId} disabled={(editState || newState) ? false : true } size="sm">
                            {categories.map((props,index)=>{
                                return <option key={index} value={props.id} selected={props.id ? props.id == values.categoryId ? true : false : false} >{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="methodId">
                        <small>Medio</small>
                        <Form.Select aria-label="medios" className="shadow-none" name="methodId" value={values.methodId}  onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.methodId && touched.methodId} disabled={(editState || newState) ? false : true } size="sm">
                            {methods.map((props,index)=>{
                                return <option key={index} value={props.id} selected={props.id ? props.id == values.methodId ? true : false : false} >{props.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="description">
                        <small>Descripcion</small>
                        <Form.Control as="textarea" rows={2} className="shadow-none" name="description" value={values.description} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.description && touched.description} readOnly={(editState || newState) ? false : true } size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="amount">
                        <div className="row">
                            <div className="col-sm-4 pe-sm-1">
                                <small>Tipo</small>
                                <Form.Select aria-label="medios" className="shadow-none" size="sm" name="depOrWit" value={values.depOrWit}  onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.depOrWit && touched.depOrWit} disabled={!newState}>
                                    <option key={1} value={1} >Deposito</option>
                                    <option key={2} value={2} selected={values.amount ? values.amount < 0  ? true : false : false}>Extraccion</option>
                                </Form.Select>
                            </div>
                            <div className="col-sm-8 ps-sm-1">
                                <small>Monto</small>
                                <Form.Control type="text" className="shadow-none" size="sm" name="amount" value={values.amount ? values.amount < 0  ? -values.amount : values.amount : values.amount} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.amount && touched.amount} readOnly={(editState || newState) ? false : true }/>
                            </div>
                        </div>                       
                    </Form.Group>

                    {editState || newState ?
                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center"  onClick={handleSubmit}  disabled={isSubmitting}> <Save className="me-2"/> Guardar</Button>
                    </div>
                    :
                    <div className="d-flex justify-content-between mt-2">
                        <Button variant="danger" className="rounded shadow-none p-1 px-2 me-2 d-flex align-items-center" onClick={handleDelete}><Trash3 className="me-2"/>  Eliminar</Button>
                        <Button variant="primary" className="rounded shadow-none p-1 px-2 d-flex align-items-center" onClick={editMethod}><PencilSquare className="me-2"/>Editar</Button>
                    </div>
                    }

                </Form>

                
            </div>
        </React.Fragment>
    )
}

TransactionPreviewEdit.defaultProps = {
    transaction:{
        accountId: 1,
        name: "",
        categoryId: 1,
        methodId: 1,
        description: "",
        depOrWit: 1,
        amount:""
    },
    accounts:[],
    categories:[],
    methods:[]
}

export default TransactionPreviewEdit;