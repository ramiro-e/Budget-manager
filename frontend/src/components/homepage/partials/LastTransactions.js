import React from 'react';
import SmallListCard from './SmallListCard';

function TransactionList({transactions, previewMethod}){

    return (
        <React.Fragment>
            <h3 className="m-0 ms-1">Ultimas Transacciones</h3>

            <div className="transaction-cards-container mt-2">
                {transactions.map((transaction,index)=>{
                    return <SmallListCard transaction={transaction} previewMethod={previewMethod} key= {index}/>
                })}      
            </div>

        </React.Fragment>
    )
}

export default TransactionList;