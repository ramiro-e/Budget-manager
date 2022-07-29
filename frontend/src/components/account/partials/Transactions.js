import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import SmallListCard from './SmallListCard';
import {Receipt} from 'react-bootstrap-icons'


function TransactionList({transactions, categories, previewMethod}){

    let unorderedTransactions = transactions
    const [transactionsState, setTransactionsState] = useState(unorderedTransactions);

    useEffect( ()=> {
        setTransactionsState(transactions)
    },[transactions])

    function handleOrderChange(event){
        let order = event.target.value
        let reorderedTransactions

        switch(order){
            case '1':
                reorderedTransactions = orderByMostRecent(unorderedTransactions)
                setTransactionsState(reorderedTransactions)
                break;
            case '2':
                reorderedTransactions = orderByAmount(unorderedTransactions)
                setTransactionsState(reorderedTransactions)
                break;
            case '3':
                reorderedTransactions = filterDeposits(unorderedTransactions)
                setTransactionsState(reorderedTransactions)
                break;
            case '4':
                reorderedTransactions = filterWithdrawals(unorderedTransactions)
                setTransactionsState(reorderedTransactions)
                break;
        }


    }

    function handleCategoryChange(event){
        let category = event.target.value
        let filteredTransactions

        filteredTransactions = filterCategories(unorderedTransactions, category)
        setTransactionsState(filteredTransactions)
    }

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

    function orderByAmount(transactionsToBeSorted){
        let sortedTransactions = [...transactionsToBeSorted]
        sortedTransactions.sort((a, b) => {
            let amount1 = a.amount
            let amount2 = b.amount
            if (amount1 > amount2) return -1;
            if (amount1 < amount2) return 1;
            return 0;
        });
        return sortedTransactions
    }


    function filterDeposits(transactions){
        let deposits = transactions.filter((tran) => {
            return tran.amount > 0
        });
        return deposits;
    }

    function filterWithdrawals(transactions){
        let withdrawals = transactions.filter((tran) => {
            return tran.amount < 0
        });
        return withdrawals;
    }

    function filterCategories(transactions, category){
        let categorized = transactions.filter((tran) => {
            return tran.categoryId == category
        });
        return categorized;
    }

    return (
        <React.Fragment>
            <h3 className="m-0 ms-1">Transacciones</h3>
            { Object.keys(transactions).length === 0 ?
            <div className="transaction-cards-container  d-flex flex-column align-items-center justify-content-center">
                <div className="bg-light p-5 mb-4 rounded-circle"><Receipt className="text-secondary recipt m-0"/></div>
                <h5 className="text-secondary fw-200">NO ENCONTRAMOS</h5>
                <h5 className="text-secondary fw-200">TRANSACCIONES</h5>
            </div> 
            :
            <div>
                <div className="row px-2">
                    <div className="col-sm-4 px-1">
                        <Form.Group className="mb-1" controlId="cuenta">
                            <small>Ordenar</small>
                            <Form.Select aria-label="cuentas" onChange={handleOrderChange} className="shadow-none" size="sm" >
                                <option key={1} value={1} >Mas recientes</option>
                                <option key={2} value={2} >Mayor monto</option>
                                <option key={3} value={3} >Depositos</option>
                                <option key={4} value={4} >Extracciones</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-sm-4 px-1">
                        <Form.Group className="mb-1" controlId="cuenta">
                            <small>Categoria</small>
                            <Form.Select aria-label="cuentas" onChange={handleCategoryChange} className="shadow-none" size="sm" >
                                {categories.map((props,index)=>{
                                    return <option key={index} value={`${props.id}`} >{props.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    {/* <div className="col-sm-6 px-1 align-self-end">
                        <Form.Group  className="mb-1">
                            <div className="d-flex">
                                <Form.Control size="sm" className="rounded-0 rounded-start shadow-none" type="text" placeholder="Buscar" />
                                <Button size="sm" variant="light" className="rounded-0 rounded-end border shadow-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Form.Group>
                    </div> */}
                </div>
                <div className="transaction-cards-container mt-2">
                {transactionsState.map((transaction,index)=>{
                    return <SmallListCard  transaction={transaction} previewMethod={previewMethod} key= {index}/>
                })}      
                </div>
            </div>
            
            }

        </React.Fragment>
    )
}

TransactionList.defaultProps = {categories:[]}

export default TransactionList;