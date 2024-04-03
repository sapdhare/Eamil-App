
const express = require('express');
const app = express();
const path=require('path');
const alert = require('alert');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
require("./db/con"); // connect to the database

const nodemailer = require('nodemailer');

const auth  = require('./models/auth');


const Register= require('./models/register');
const { register } = require('module');
const port = process.env.port || 3000;

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../views')));//set public folder as static
app.set("view engine", "hbs");
app.get('/login', (req, res) => {
   res.render("login");
});

app.post('/login', async(req, res) => {
   try{
      const eamil=req.body.email;
      const pass=req.body.password;
      
      const user= await Register.findOne({email:eamil});
      const token= await user.generatetoken();
      res.cookie("jwt",token,{
         expires: new Date(Date.now()+300000),
         
      });
         if(pass===user.password){   
            res.redirect('index'); 
         }
         else{     
            res.redirect('login');
         }
      
     


   }catch(error){
      res.send(error);
   }
});

app.get('/register', (req, res) => {
   res.render("register");
});

//crreate user
app.post('/register', async(req, res) => {
   try{

      const pass = req.body.password;
      const cpass =req.body.cpassword;
      const srvc=req.body.emailpass;
      console.log(pass," ,, " ,cpass, "  ,,  ");
      if(pass === cpass){
         const user = new Register({
            email: req.body.email,
            service: req.body.service,
            mailPassword: srvc,
            password: pass,
            cPassword: cpass,
         })
         
         // const token = await user.generateToken();
         const token= await user.generatetoken();
         res.cookie("jwt",token);
         await user.save();
         
         res.redirect('index');

         
      }
      else{
         res.send('Password not matched')
         
      }

   }catch(error){
      res.send(error);
      console.log(error.message);
   }

});

app.get('/index', auth, (req, res) => {

   // const userdtls =req.userdtls
   // console.log(userdtls.email);
   res.render("index");
   
});

app.post('/index',auth, async(req,res)=>{

  try{

   const userdtls =req.userdtls;

   const usrdtl1= aut.req.userdtls
      
      //1. create an email transporter.
      //SMTP (Simple Mail Transfer Protocol)
      
   const usrmail=userdtls.email;
   const mailpass=userdtls.mailPassword;
   const service = userdtls.service;
     const transporter =  nodemailer.createTransport({
          service: service,
          auth:{
              user: usrmail,
              pass: mailpass
          }
      })
  
      
      const tomail= req.body.toEmail
      const subject=req.body.subject;
      const message=req.body.message;

      //2.configure email content.
      const mailOptions = {
          from:usrmail,
          to: tomail,
          subject: subject,
          text: message,
      }
  
      //3. send email
      try {
         const result = await transporter.sendMail(mailOptions);
         console.log('Eamil sent successfully')
      } catch (error) {
          console.log('Email send failed with error:', error.message)
      }
  

  }catch(error){
   res.send(error);
   console.log(error.message);
  }

  
});
 

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});

