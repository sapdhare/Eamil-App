const jwt = require('jsonwebtoken');
const Register= require('./register');


const auth= async (req, res,next) => {
        try{


            const token =req.cookies.jwt;
            const verifyUser =jwt.verify(token,"taskofemailsendingusingclientmail")

            

            const user = await Register.findOne({_id:verifyUser._id})
            req.userdtls=user;
            next();

        }catch(error){
            res.send(error);
            console.log(error.message);
        }
}

module.exports = auth;
    