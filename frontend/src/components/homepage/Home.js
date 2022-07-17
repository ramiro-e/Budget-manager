import React from 'react';

import AccountHeader from './partials/AccountHeader';
import AccountCards from './partials/AccountCards';
import LastTransactions from './partials/LastTransactions';
import NewTransaction from './partials/NewTransaction';
import TransactionPreviewEdit from './partials/TransactionPreviewEdit';


function Home(){

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
                            <LastTransactions transactions={lastTransactions}/>
                        </div>
                        <div className="lastTransactionPreviewEdit col-md-6">

                        </div>
                    </div>
                </section>
            </main>

        </React.Fragment>
    )
}
export default Home;