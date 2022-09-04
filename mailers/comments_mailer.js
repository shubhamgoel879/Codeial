const nodemailer = require('../config/nodemailer');


exports.newComment=(comment)=>{
    console.log('inside comment mailer');
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'codeial.com',
        to:comment.user.email,
        subject:"You commented",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
       // console.log('Message Sent',info);
        return;
    })
}