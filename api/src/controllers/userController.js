const jwt = require('jsonwebtoken')
const db = require('../database/models');
const User = db.User
const bcrypt = require('bcryptjs')

const userControllers = {
    login: (req, res) => {
        User.findOne({
            where:{email:req.body.email}
        })
        .then((user)=>{
            let token = signToken(user)
            res.json({meta:{status:200}, token})
        })
        .catch((error)=>{
            console.log(error)
            let response = {
                meta: {
                    status: 400
                }
            } 
            res.json(response)  

        })                                     //return res.send(userLogin);
    },
    logout: (req,res) =>{
        res.json({meta:{status:200}})
    },
    checkEmail:  (req, res) => {
        User.findOne({where:{email: req.body.email,}})
        .then((email)=>{
            let data = {}
            data.emailExist = email ? true : false
            res.json({
                meta:{status:200},
                data
            })
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
    register:  (req, res) => {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        })
        .then(()=>{
            res.json({meta:{status:200}})
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

function signToken(payload){
    let token = jwt.sign({ payload }, 'secretkey', {
		algorithm: "HS256",
		expiresIn: '6h',
	})
    return token
}

module.exports = userControllers;