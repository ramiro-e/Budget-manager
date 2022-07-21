import React from 'react';
import SmallListCard from './SmallListCard';
import {Receipt} from 'react-bootstrap-icons'

function TransactionList({transactions, previewMethod}){

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
                {transactions.map((transaction,index)=>{
                    return <SmallListCard transaction={transaction} previewMethod={previewMethod} key= {index}/>
                })}      
            </div>
            }

        </React.Fragment>
    )
}

export default TransactionList;