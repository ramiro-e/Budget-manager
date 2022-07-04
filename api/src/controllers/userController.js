const userControllers = {
    login: (req, res) => {
        let validation = validationResult(req);             //return res.send(errors.mapped());
        let errors = validation.errors;
        console.log(errors);
        if(validation.isEmpty()){
            Users.findOne({
                where:{email:req.body.email}
            })                                              //return res.send(userLogin);
            .then((user) => {
                delete user.password;
                jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
                    res.json({token});
                });
                return res.redirect('/');
            })
            .catch(error => console.log(error))
        }else{
            res.render(path.resolve(__dirname, '../views/user/login'),{
                title: "Ingresar | Vigilancia Argentina",
                errors
            })
        }
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.clearCookie('email');
        res.redirect('/')
    },
    register:  (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors;
        if (validation.isEmpty()) {
            Users.create({
                email: req.email,
                firstName: req.firstName,
                lastName: req.lastName,
                password: bcrypt.hashSync(req.body.password, 10),
            })
            .then(() => {
                return res.render(path.resolve(__dirname, '../views/user/registerMessage'),{
                    title: "¡Registro Exitoso! | Vigilancia Argentina"
                });
            })
            .catch(error => res.send(error));
        } else {
            console.log(errors)
            return res.render(path.resolve(__dirname, '../views/user/register'),{
                title: "Registrarse | Vigilancia Argentina",
                errors
            });
        }
    },
}
module.exports = userControllers;