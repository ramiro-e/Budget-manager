const jwt = require('jsonwebtoken')

const userControllers = {
    login: (req, res) => {
        Users.findOne({
            where:{email:req.body.email}
        })
        .then((user)=>{
            let token = signToken(user)
            res.json({meta:{status:200}, token})
        })                                              //return res.send(userLogin);
    },
    logout: (req,res) =>{
        res.json({meta:{status:200}})
    },
    register:  (req, res) => {
        Users.create({
            email: req.email,
            firstName: req.firstName,
            lastName: req.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
        })
        .then(()=>{
            res.json({meta:{status:200}})
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

module.exports = userControllers;