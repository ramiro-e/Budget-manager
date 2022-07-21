import React, { useState } from 'react';
import '../../assets/Home.css';

import AccountHeader from './partials/AccountHeader';
import AccountCards from './partials/AccountCards';
import LastTransactions from './partials/LastTransactions';
import NewTransaction from './partials/NewTransaction';
import TransactionPreviewEdit from './partials/TransactionPreviewEdit';

function Home(){


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

    return(
        <React.Fragment>
            <main>    
                <section className="AccountContainer">
                    <AccountHeader/>
                    <AccountCards accountsCards={accountsCards}/>
                </section>
                <section className="TransactionContainer">
                    <div className="row">                
                        <div className="lastTransactionList col-md-6">
                            <LastTransactions transactions={lastTransactions} previewMethod={previewTPE}/>
                        </div>
                        <div className="lastTransactionPreviewEdit col-md-6">
                            {TPE_show ? 
                            <TransactionPreviewEdit transaction={TPE_data} editState={TPE_edit}  newState={TPE_new} cancelMethod={cancelTPE} editMethod={editTPE}  /> 
                            : 
                            <NewTransaction newMethod={newTPE}/>}
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}
export default Home;