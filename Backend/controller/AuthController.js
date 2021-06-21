const User  = require('../models/user')
const bcrypt  = require('bcryptjs')
const jwt    = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.Password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        let user = new User ({
            name : req.body.Name,
            email : req.body.Email,
            phone : req.body.PhoneNumber,
            password : hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'user added successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'an error occoured!'
            })
        })
        
    })

 
}

const login = async (req,res,next) => {
    //console.log("and here")
    var username = req.body.Username
    var password= req.body.Password
    console.log(username,password)


    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user => {
        if (user){
            bcrypt.compare(password,user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.name},'verySecretValue', {expiresIn:'1h'})
                    res.json({
                        message: 'Login Successful',
                        token,
                        user
                      
                    })
                }else{
                    res.status(403).json({
                        message: 'password does not matched'
                    })
                }
            })
        }else{
            res.status(404).json({
                message: 'No user found'
            })
        }
    })

}

module.exports = {login,register};