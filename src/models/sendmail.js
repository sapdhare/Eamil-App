//1. install nodemailer libararay

//2. import nodemailer
const nodemailer = require('nodemailer');

//3. cofigure mail and send it
async function sendMail(){
    //1. create an email transporter.
    //SMTP (Simple Mail Transfer Protocol)
   const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'idealtechguru1@gmail.com',
            pass: 'slnrhjpbuqaqpory'
        }
    })


    //2.configure email content.
    const mailOptions = {
        from:'idealtechguru1@gmail.com',
        to: 'apnicoding72@gmail.com',
        subject: 'Welcome to NodeJS App',
        text: 'This is an email using nodemail in nodejs',
    }

    //3. send email
    try {
       const result = await transporter.sendMail(mailOptions);
       console.log('Eamil sent successfully')
    } catch (error) {
        console.log('Email send failed with error:', error)
    }
}

sendMail()