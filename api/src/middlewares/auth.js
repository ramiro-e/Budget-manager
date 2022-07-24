const db = require('../database/models');
const User = db.User
const Account = db.Account
const jwt = require('jsonwebtoken')



module.exports = async (req,res,next) =>{

    let bearerHeader =  req.headers['authorization'];
    let bearerToken 
    if(typeof bearerHeader !== 'undefined'){
        bearerToken = bearerHeader.split(" ")[1];
    }else{
        res.sendStatus(403);
    }

    // let tokensito = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6InJhbWlyb2VzdGV2ZXo5NkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJSYW1pcm8iLCJsYXN0TmFtZSI6IkVzdGV2ZXoiLCJwYXNzd29yZCI6IiQyYSQxMCRxVjNObWlLdzRDbkgwcUIwSWlHc3hlR0JZLzAwUzYzR1AzRWY5Y2RScG15UkQ0SUxUSGU5aSJ9LCJpYXQiOjE2NTkyMjY0NDIsImV4cCI6MTY1OTIzMDA0Mn0.y1Vq68RwnPQS53jCT1tFzgIpoTO8WH7fJszjFDmKkk8"

    // console.log(typeof tokensito)
    // console.log(bearerToken)

    jwt.verify(bearerToken, 'secretkey', (error, authData) => {

        if(error){
            res.sendStatus(403);
        }else{
            console.log("success")
            delete(authData.payload.password)
            req['userData'] = authData.payload
            next()
        }
    });
}
