import React from 'react';
import SmallListCard from './SmallListCard';
import {Receipt} from 'react-bootstrap-icons'

function TransactionList({transactions, previewMethod}){

    let orderedTransactions = orderByMostRecent(transactions)

    function orderByMostRecent(transactionsToBeSorted){
        let sortedTransactions = [...transactionsToBeSorted]
        sortedTransactions.sort((a, b) => {
            let date1 = new Date(a.createdAt);
            let date2 = new Date(b.createdAt);
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
        });
        return sortedTransactions
    }


    return (
        <React.Fragment>
            <h3 className="m-0 ms-1">Ultimas Transacciones</h3>
            { Object.keys(transactions).length === 0 ?
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="bg-light p-5 mb-4 rounded-circle"><Receipt className="text-secondary recipt m-0"/></div>
                <h5 className="text-secondary fw-200">NO ENCONTRAMOS</h5>
                <h5 className="text-secondary fw-200">TRANSACCIONES</h5>
            </div> 
            :
            <div className="transaction-cards-container mt-2">
                {orderedTransactions.map((transaction,index)=>{
                    return <SmallListCard transaction={transaction} previewMethod={previewMethod} key= {index}/>
                })}      
            </div>
            }

        </React.Fragment>
    )
}

export default TransactionList;