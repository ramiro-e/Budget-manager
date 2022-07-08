const db = require('../database/models');
const Transaction = db.Transaction
const User = db.User
const Account = db.Account
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')

const mainControllers = {
    getUserAccounts:(req, res) =>{
        Account.findAll({
            where:{userId: req.userId}
        })
        .then((account)=>{
            let response = {
                meta: {
                    status: 200,
                    total: account.length,
                },
                data: account
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    },
    getAccountData:(req, res) =>{
        Account.findOne({
            where:{id: req.accountId}
        })
        .then((account)=>{
            let response = {
                meta: {
                    status: 200,
                    total: account.length,
                },
                data: account
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    },
    getAccountTransaction: (req, res) =>{
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
            return {balance, transactions}
        })
        .then((transactions)=>{
            let response = {
                meta: {
                    status: 200,
                    total: transactions.transactions.length,
                },
                data: transactions
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    },
    getAccountTransactions: (req, res) =>{
        Transaction.findAll({
            include: [{
                model: Account,
                required: true,
                where: {
                    id: req.accountId // here is the condition on a certain user id
                }
            }],
        })
        .then((allTransactions)=>{
            let response = {
                meta: {
                    status: 200,
                    total: allTransactions.length,
                },
                data: allTransactions
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    },
    getUserLastTransactions: (req, res) =>{
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
            let response = {
                meta: {
                    status: 200,
                    total: lastTransactions.length,
                },
                data: lastTransactions
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

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
        .then((Transaction)=>{
            let response = {
                meta: {
                    status: 200,
                    total: Transaction.length,
                },
                data: Transaction
            }
            let token = signToken(response)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

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
            let token = signToken(200)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

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
            let token = signToken(200)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    },
    deleteTransaction: (req, res) =>{
        Transaction.destroy({
            where:{
                id: req.transactionId
            }
        })
        .then(()=>{
            let token = signToken(200)
            res.json({token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            }
            let errorToken = signToken(response)
            res.json({errorToken})    

        })
    }


}

function signToken(payload){
    let token = jwt.sign({ payload }, 'secretkey', {
		algorithm: "HS256",
		expiresIn: '1h',
	})
    return token
}

module.exports = mainControllers;
