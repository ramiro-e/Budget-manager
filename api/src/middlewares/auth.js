const db = require('../database/models');
const User = db.User
const Account = db.Account
const jwt = require('jsonwebtoken')



module.exports = async (req,res,next) =>{

    let bearerHeader =  req.headers.authorization;
    let bearerToken 
    if(typeof bearerHeader !== 'undefined'){
        bearerToken = bearerHeader.split(" ")[1];
    }else{
        res.sendStatus(403);
    }

    jwt.verify(bearerToken, 'secretkey', (error, authData) => {

        if(error){
            res.sendStatus(403);
        }else{
            delete(authData.payload.password)
            req.userData = authData.payload
            next()
        }
    });
}
