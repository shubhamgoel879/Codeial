const nodemailer = require('../config/nodemailer');


exports.newComment=(comment)=>{
    console.log('inside comment mailer');
    nodemailer.transporter.sendMail({
        from:'codeial.com',
        to:comment.user.email,
        subject:"You commented",
        html:'<h1>Comment Published</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    })
}