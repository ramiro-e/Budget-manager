const db = require('../database/models');
const Transaction = db.Transaction
const User = db.User
const Account = db.Account
const Category = db.Category
const Method = db.Method
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const jwt = require('jsonwebtoken')

const mainControllers = {
    getUserAccounts:(req, res) =>{
        Account.findAll({
            where:{userId: req.userData.id}
        })
        .then((account)=>{
            let response = {
                meta: {
                    status: 200,
                    total: account.length,
                },
                data: account
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    getCategories:(req, res) =>{
        Category.findAll()
        .then((categories)=>{
            let response = {
                meta: {
                    status: 200,
                    total: categories.length,
                },
                data: categories
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    getMethods:(req, res) =>{
        Method.findAll()
        .then((categories)=>{
            let response = {
                meta: {
                    status: 200,
                    total: categories.length,
                },
                data: categories
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    getUserAccountsData:async (req, res) =>{
        try {
            let userAccounts = await Account.findAll({
                where:{userId: req.userData.id},
                raw: true
            })
            console.log(userAccounts)
            let accountsWithBalance = []
            for(let account of userAccounts){
                try {
                    let balance = await Transaction.findAll({            
                        attributes: [
                            [sequelize.fn('sum', sequelize.col('amount')), 'amount'],
                        ],
                        group: ['accountId'],
                        where:{accountId: account.id},
                        raw: true
                    })
                    let accountCopy = {...account}
                    if(balance[0]){
                        accountCopy['balance'] = balance[0].amount
                    }else{
                        accountCopy['balance'] = 0
                    }
                    accountsWithBalance.push(accountCopy)
                } catch (error) {
                    console.log(error)
                }
            }
            let response = {
                meta: {
                    status: 200,
                    total: accountsWithBalance.length,
                },
                data: accountsWithBalance
            }
            res.json(response)
        } catch (error) {
            console.log(error)
        }  
    },
    getAccountData:(req, res) =>{
        Transaction.findAll({
            include: [{
                model: Account,
                required: true,
                where: {
                    id: req.body.accountId 
                }
            },{
                model: Category
            },{
                model: Method
            }],            
            attributes: [
                'accountId',
                [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
            ],
            group: ['accountId']
        })
        .then((account)=>{
            let response = {
                meta: {
                    status: 200,
                    total: account.length,
                },
                data: account
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    getAccountAllTransactions: (req, res) =>{
        Transaction.findAll({
            include: [{
                model: Account,
                required: true,
                where: {
                    id: req.body.accountId 
                }
            },{
                model: Category
            },{
                model: Method
            }]
        })
        .then((allTransactions)=>{
            let response = {
                meta: {
                    status: 200,
                    total: allTransactions.length,
                },
                data: allTransactions
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

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
                        id: req.userData.id
                    }
                }]
            },{
                model: Category
            },{
                model: Method
            }],
            limit: 10            
        })
        .then((lastTransactions)=>{
            // console.log("\x1b[36m",lastTransactions)

            let response = {
                meta: {
                    status: 200,
                    total: lastTransactions.length,
                },
                data: lastTransactions
            }
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

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
            res.json(response)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    newAccount: (req, res) =>{
        let colors = ['f94144','f3722c','f8961e','f9844a','f9c74f','90be6d','43aa8b','4d908e','577590','277da1']
        let randomColor = colors[Math.floor(Math.random()*colors.length)];
        console.log('\x1b[36m%s\x1b[0m', randomColor)
        Account.create({
            userId: req.userData.id,
            name: req.body.name,
            color: randomColor
        })
        .then(()=>{
            res.json(200)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    newTransaction: (req, res) =>{
        Transaction.create({
            accountId: req.body.accountId,
            // datetime: req.body.datetime,
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description,
            amount: req.body.amount,
            methodId: req.body.methodId
        })
        .then(()=>{
            res.json(200)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    editTransaction: (req, res) =>{
        Transaction.update({
            // datetime: req.datetime,
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description,
            amount: req.body.amount,
            methodId: req.body.methodId
        },{
            where:{
                id: req.body.id
            }
        })
        .then(()=>{
            res.json(200)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    },
    deleteTransaction: (req, res) =>{
        Transaction.destroy({
            where:{ id: req.body.id }
        })
        .then(()=>{
            res.json(200)
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })
    }

}


module.exports = mainControllers;



// include: [{
//     model: Category
// },{
//     model: Method
// }]



// getUserAccountsData: (req, res) =>{

//     Transaction.findAll({
//         include: [{
//             model: Account,
//             required: true,
//             include: [{
//                 model: User,
//                 required: true,
//                 where: {
//                     id: req.userData.id 
//                 }
//             }]
//         }],
//         attributes: [
//             'accountId',
//             [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
//         ],
//         group: ['accountId']
//     })
//     .then((balance)=>{
//         let response = {
//             meta: {
//                 status: 200,
//             },
//             data: balance
//         }
//         res.json(response)
//     })
//     .catch((error)=>{
//         console.log(error)
//         let response = {
//             meta: {
//                 status: 400
//             }
//         } 
//         res.json(response)  

//     })
// },