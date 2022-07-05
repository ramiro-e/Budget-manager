const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const db = require('../database/models');
const User = db.User
const authorize = require('../middlewares/auth')


const validationLogin = (req, res, next) => {
    User.findOne(
        {where: {email: req.email}
    })
    .then(user => {
        if (!user) {
            res.send(404);
        } else if(bcrypt.compareSync(req.password, user.dataValues.password)){
            next()
        }else{
            res.send(403);
        }
    })
}

const validateEmail = (email) => {
    if(!email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){ return false}
    if(User.findOne(
        {where: {email: req.email}
    })){ return false}
};

const validatePassword = (password) => {
    if(!password.match(/^(?=.*[a-z])(?=.{8,100})(?=.*\d).{8,100}$/)){   return false}
};

const ValidationRegister = (req, res, next) => {
    if(!typeof req.firstName == 'string' || !req.firstName.length >= 1){
        res.send(403);
        return 
    }else if(typeof req.lastName != 'string' || !req.lastName.length >= 1){
        res.send(403);
        return
    }else if(typeof req.email != 'string' || !validateEmail(req.email)){
        res.send(403);
        return
    }else if(typeof req.password != 'string' || !validatePassword(req.password)){
        res.send(403);
        return
    }else{
        next();
    }
};


router.post('/login', validationLogin ,userController.login);
router.post('/logout', userController.logout);

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