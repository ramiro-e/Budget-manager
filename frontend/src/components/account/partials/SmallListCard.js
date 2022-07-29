import React from 'react';
import {Link} from "react-router-dom";

function SmallListCard({transaction, previewMethod}){
    let {Account, name, Category, createdAt, amount} = transaction

    let today = new Date()
    let transactionDate = new Date(createdAt)
    let relativeTransactionDate
    let options = {}

    if(today.getFullYear() > transactionDate.getFullYear()){options['year'] = 'numeric'} ;
    if (today.getFullYear() === transactionDate.getFullYear() && today.getMonth() === transactionDate.getMonth() && today.getDate() === transactionDate.getDate()) {
        options['hour'] = '2-digit';
        options['minute'] = '2-digit';
        relativeTransactionDate = transactionDate.toLocaleTimeString('es-AR', options)
    }else{
        options['month'] = 'long';
        options['day'] = 'numeric';
        relativeTransactionDate = transactionDate.toLocaleDateString('es-AR', options)
    }

    let $
    let $color
    if(amount < 0){
        $ = "-$" + amount.toString().replace('-', '')
        $color = 'danger'
    }else{
        $ = "$" + amount
        $color = 'primary'
    }


    let previewTransaction = previewMethod
    function handleClick(){
        previewTransaction(transaction)
    }

    // console.log(Object.getOwnPropertyNames(props))

    return(
        <React.Fragment>
            <div className="me-2 text-decoration-none" onClick={handleClick}>
                <div className=" mb-3 mt-1 rounded shadow-sm d-flex">
                    <div className={`bg-light rounded-end px-2 flex-fill`}>
                        <div>
                            <p className="m-0">{name}</p>
                            <div className="d-flex">
                                <div className="flex-fill d-flex text-secondary">
                                    <small className="m-0 me-1 fw-light">{relativeTransactionDate}</small>·<small className="m-0 ms-1 fw-light">{Category.name}</small>
                                </div>
                                <p className={`m-0 text-${$color}`}>{$}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SmallListCard;