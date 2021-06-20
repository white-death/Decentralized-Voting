const user  = require('../models/user')
const bcrypt  = require('bcryptjs')
const jwt    = require('jsonwebtoken')


const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res,json({
                error:err
            })
        }
    })

    let user = new User ({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        passwd : hashedPass
    })
    user.save()
    .then(user => {
        res.json({
            message: 'user added successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'an error occured!'
        })
    })
}

const login = (req,res,next) => {
    var username = req.body.username
    var password= req.body.password

    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user => {
        if (user){
            bcrypt.compare(password,user,password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.name},'verySecretValue', {expiresIn:'1h'})
                    res.json({
                        message: 'Login Successful',
                        token
                      
                    })
                }else{
                    res.json({
                        message: 'password does not matched'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found'
            })
        }
    })

}

module.export = {
    register, login
}