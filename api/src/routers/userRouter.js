const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const db = require('../database/models');
const User = db.User
const authorize = require('../middlewares/auth')
const bcrypt = require('bcryptjs')



const validationLogin = (req, res, next) => {
    User.findOne(
        {where: {email: req.body.email}
    })
    .then(user => {
        if (!user) {
            res.send(404);
        }else if(bcrypt.compareSync(req.body.password, user.dataValues.password)){
            next()
        }else{
            res.send(403);
        }
    })
}

const validateEmail = async (email) => {
    if(!email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){ return false }
    let findEmail = await User.findOne({where: {email: email}})
    if(findEmail !== null){
        return false
    }
    return true
};

const validatePassword = (password) => {
    if(!password.match(/^(?=.*[a-z])(?=.{8,100})(?=.*\d).{8,100}$/)){return false}
    return true
};

const ValidationRegister = (req, res, next) => {
    if(typeof req.body.firstName != 'string' || !req.body.firstName.length >= 1){
        res.send(403);
        return 
    }else if(typeof req.body.lastName != 'string' || !req.body.lastName.length >= 1){
        res.send(403);
        return
    }else if(typeof req.body.email != 'string' || !validateEmail(req.body.email)){
        res.send(403);
        return
    }else if(typeof req.body.password != 'string' || !validatePassword(req.body.password)){
        res.send(403);
        return
    }else{
        console.log('next')
        next();
    }
};


router.post('/login', validationLogin ,userController.login);
router.post('/logout', userController.logout);

router.post('/checkEmail' ,userController.checkEmail);
router.post('/register', ValidationRegister ,userController.register);




// router.get("/tokeninfo", (req , res) => {
//     const user = {
//         id: 1,
//         nombre : "Henry",
//         email: "henry@email.com"
//     }

//     jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
//         res.json({
//             token
//         });
//     });
    

// });

// router.post("/tokencheck", authorize, (req , res) => {
//     console.log('tokencheck completed')    

// });


// res.json({
//     mensaje: "Post fue creado",
//     authData
// });


module.exports = router;