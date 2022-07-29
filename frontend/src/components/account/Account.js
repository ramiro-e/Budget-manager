
import React, { useState, useEffect } from 'react';
import {Link, useParams } from "react-router-dom";
import postServices from '../../api/postServices';
import Transactions from './partials/Transactions';
import AccountInfo from './partials/AccountInfo';
import TransactionPreviewEdit from './partials/TransactionPreviewEdit';
import NewTransaction from './partials/NewTransaction';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

function Account() {

    let { id } = useParams();
    const [account, setAccountData] = useState(undefined);
    const [transactions, setAccountTransactionsList] = useState([]);
    
    const getAccountData = async () => {
        const response = await postServices.getAccountData({accountId: id});
        let account = response.data
        setAccountData(account[0])
    }

    const getAccountAllTransactions = async () => {
        const response = await postServices.getAccountAllTransactions({accountId: id});
        let transactions = response.data
        setAccountTransactionsList(transactions)
    }



    const [categories, setCategories] = useState(undefined);
    const [methods, setMethods] = useState(false);

    const getCategories = async () => {
        const response = await postServices.getCategories();
        let categories = response.data
        setCategories(categories); 
    }
    const getMethods = async () => {
        const response = await postServices.getMethods();
        let methods = response.data
        setMethods(methods); 
    }



    const [TPE_show, setTPE_show] = useState(false);
    const [TPE_edit, setTPE_edit] = useState(false);
    const [TPE_new , setTPE_new ] = useState(false);
    const [TPE_data, setTPE_data] = useState(undefined);

    const sleep = (milliseconds=1) => new Promise(resolve => setTimeout(resolve, milliseconds))

    async function previewTPE(transactionProps){
        setTPE_show(true)
        await sleep(1)
        setTPE_data(transactionProps)
        setTPE_new(false)
        setTPE_edit(false)
    }

    function editTPE(){
        setTPE_new(false)
        setTPE_edit(true)
    }

    function newTPE(){
        setTPE_show(true)
        setTPE_data(undefined)
        setTPE_edit(false)
        setTPE_new(true)
    }

    function cancelTPE(){
        setTPE_show(false)
        setTPE_data(undefined)
        setTPE_edit(false)
        setTPE_new(false)
    }

    async function newTransaction(data){
        const response = await postServices.newTransaction(data);
        setTPE_new(false)
        setTPE_edit(false)
        updateStates()
    }

    async function editTransaction(data){
        const response = await postServices.editTransaction(data);
        setTPE_new(false)
        setTPE_edit(false)
        updateStates()
    }

    async function deleteTransaction(data){
        const response = await postServices.deleteTransaction(data);
        setTPE_show(false)
        updateStates()
    }

    function updateStates(){
		getAccountAllTransactions();
		getAccountData();
    }


	useEffect( ()=> {
        getCategories();
        getMethods();

		getAccountAllTransactions();
		getAccountData();
    },[])

    return (
        <React.Fragment>
            <div className="d-flex">
                <Link to={`/`} className="text-decoration-none d-flex align-items-center">
                    <Button className="p-2 mx-2 back-button shadow-none  shadow-sm d-flex align-items-center" variant="primary"> <ArrowLeft className="h3 m-0"/> </Button>
                </Link>
                <AccountInfo  accountInfo={account} />
            </div>
            <div>
            <div className="row">
                <div className="lastTransactionList col-md-6">
                    <Transactions transactions={transactions} categories={categories}previewMethod={previewTPE} />
                </div>
                <div className="lastTransactionPreviewEdit col-md-6">
                    {TPE_show ? <TransactionPreviewEdit transaction={TPE_data} categories={categories} methods={methods} editState={TPE_edit}  newState={TPE_new} cancelMethod={cancelTPE} editMethod={editTPE} editTransaction={editTransaction} newTransaction={newTransaction} deleteTransaction={deleteTransaction}  /> : <NewTransaction newMethod={newTPE}/>}
                </div>
            </div>
            </div>
            
        </React.Fragment>
    );
}

export default Account;