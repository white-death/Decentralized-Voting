const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    phone : {
        type:String,
        required:true
    },
    email : {
        type:String,
        require:true,
        unique:true
    },
    passwd : {
        type:String,
        require:true
    }
})

const Users = new mongoose.model("Users",user);

module.exports = Users;