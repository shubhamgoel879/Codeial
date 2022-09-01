const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter= nodemailer.createTransport({
    
    host:'smtp.mailtrap.io',
    port: 2525,
    
    auth:{
        user:'2e05cc4254c1b2',
        pass:'ac91d59dccfede'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}