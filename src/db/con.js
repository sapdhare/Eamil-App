const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/MailTask", { 
}).then(() => {
    console.log("Connected Successful");
}).catch((e) => { 
    console.log(e);
});