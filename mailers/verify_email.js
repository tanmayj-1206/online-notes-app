const nodemailer = require('../config/nodemailer');

module.exports.verifyAccount = async function(user, relLink, updateEmail){
    try{

        let link = `http://localhost:8000${relLink}`;
        
        let htmlString = nodemailer.renderTemplate({user: user, link: link}, '/verification_mail.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: '"Online Notes" <tanmayjoshi0135@gmail.com>', // sender address
            to: updateEmail.newEmail, // list of receivers
            subject: "Account verification", // Subject line
            html: htmlString, // html body
        });

        console.log(info);
    }catch(err){
        console.log(err);
    }
}