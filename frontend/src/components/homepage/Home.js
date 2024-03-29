import React, { useState, useEffect } from 'react';
import postServices from '../../api/postServices';
import '../../assets/Home.css';
import {Navigate} from 'react-router-dom'
import AccountHeader from './partials/AccountHeader';
import AccountCards from './partials/AccountCards';
import NewAccount from './partials/NewAccount';
import Modal from 'react-bootstrap/Modal';
import LastTransactions from './partials/LastTransactions';
import NewTransaction from './partials/NewTransaction';
import TransactionPreviewEdit from './partials/TransactionPreviewEdit';

function Home(){

    const [accountsCards, setAccountCards] = useState([{}]);
    const [lastTransactions, setUserLastTransactions] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalRedirect, setModalRedirect] = useState(null);


    const getUserLastTransactions = async () => {
        const response = await postServices.getUserLastTransactions();
        let transactions = response.data
        setUserLastTransactions(transactions); 
    }
   
    const getUserAccountsData = async () => {
        const response = await postServices.getUserAccountsData();
        let accounts = response.data
        setAccountCards(accounts)
    }

    const [accounts, setAccounts] = useState(false);
    const [categories, setCategories] = useState(false);
    const [methods, setMethods] = useState(false);

    const getUserAccounts = async () => {
        const response = await postServices.getUserAccounts();
        let accounts = response.data
        setAccounts(accounts); 
    }
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


    function previewTPE(transactionProps){
        setTPE_show(true)
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
        getUserAccounts();
        getCategories();
        getMethods();

        getUserLastTransactions();
		getUserAccountsData();
    }

	useEffect( ()=> {
        getUserAccounts();
        getCategories();
        getMethods();

		getUserLastTransactions();
		getUserAccountsData();
    },[])

    return(
        <React.Fragment>
            {accountsCards.length > 0 ?
                <main className="min-vh-100">    
                    <section className="AccountContainer">
                        <AccountHeader setModalShow={setModalShow} updateStates={updateStates}/>
                        <AccountCards accountsCards={accountsCards} setModalShow={setModalShow}/>
                    </section>
                    <section className="TransactionContainer">
                        <div className="row">                
                            <div className="lastTransactionList col-md-6">
                                <LastTransactions transactions={lastTransactions} previewMethod={previewTPE}/>
                            </div>
                            <div className="lastTransactionPreviewEdit col-md-6">
                                {TPE_show ? 
                                <TransactionPreviewEdit transaction={TPE_data} accounts={accounts} categories={categories} methods={methods} editState={TPE_edit}  newState={TPE_new} cancelMethod={cancelTPE} editMethod={editTPE} editTransaction={editTransaction} newTransaction={newTransaction} deleteTransaction={deleteTransaction} /> 
                                : 
                                <NewTransaction newMethod={newTPE}/>}
                            </div>
                        </div>
                    </section>
                </main>
            :
                <main className="min-vh-100 d-flex align-items-center justify-content-center">
                    <section className="col-md-6"><NewAccount  setModalShow={setModalRedirect}  updateStates={updateStates}/></section>
                </main>
            }

            <Modal show={modalShow}><NewAccount setModalShow={setModalShow} updateStates={updateStates}/></Modal>
        </React.Fragment>
    )
}
export default Home;