const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    service:{
        type:String,
        required:true
    },

    mailPassword:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]


})

// generating troken
UsersSchema.methods.generatetoken = async function(){
    try{
        
        
        const token = jwt.sign({_id:this._id}, "taskofemailsendingusingclientmail");
        this.tokens =this.tokens.concat({token:token})
        await this.save();
       return token;
    }catch(error){
        res.send(error);
        console.log(error.message);
    }
}

const Register = new mongoose.model("User", UsersSchema);

module.exports = Register;