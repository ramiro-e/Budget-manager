const db = require('../database/models');
const Transaction = db.Transaction
const User = db.User
const Account = db.Account
const { Op } = require("sequelize");

const mainControllers = {
    getAccouts:(req, res) =>{
        Account.findAll({
            where:{accountId: req.accountId}
        })
        .then((account)=>{
            res.send(account)
        })
    },
    getAccountBalance: (req, res) =>{
        Transaction.findAll({
            where:{accountId: req.accountId},
            include: [{
                model: Category
            },{
                model: Method
            }]
        })
        .then((transactions) =>{ 
            let balance = transactions.map((transaction) =>{ return transaction.amount; }).reduce((a,b)=> a + b);
            return balance
        })
        .then((balance)=>{
            res.send(balance)
        })
    },
    getAllTransactions: (req, res) =>{
        Transaction.findAll({
            where:{accountId: req.accountId}
        })
        .then((lastTransactions)=>{
            res.send(lastTransactions)
        })
    },
    getLastTransactions: (req, res) =>{
        Transaction.findAll({
            include: [{
                model: Account,
                required: true,
                include: [{
                    model: User,
                    required: true,
                    where: {
                        id: userId // here is the condition on a certain user id
                    }
                }]
            }],
            limit: 10            
        })
        .then((lastTransactions)=>{
            res.send(lastTransactions)
        })
    },
    getTransactionById: (req, res) =>{
        Transaction.findByPk(req.transactionId,{
            include: [{
                model: Category
            },{
                model: Method
            }]
        })
        .then((lastTransactions)=>{
            res.send(lastTransactions)
        })
    },
    newTransaction: (req, res) =>{
        Transaction.create({
            accountId: req.accountId,
            datetime: req.datetime,
            name: req.name,
            categoryId: req.categoryId,
            description: req.description,
            amount: req.amount,
            depOrWit: req.depOrWit,
            methodId: req.methodId
        })
        .then(()=>{
            res.send(200)
        })
    },
    editTransaction: (req, res) =>{
        Transaction.update({
            accountId: req.accountId,
            datetime: req.datetime,
            name: req.name,
            categoryId: req.categoryId,
            description: req.description,
            amount: req.amount,
            methodId: req.methodId
        },{
            where:{
                id: req.transactionId
            }
        })
        .then(()=>{
            res.send(200)
        })
    },
    deleteTransaction: (req, res) =>{
        Transaction.destroy({
            where:{
                id: req.transactionId
            }
        })
        .then(()=>{
            res.send(200)
        })
    }


}
module.exports = mainControllers;
