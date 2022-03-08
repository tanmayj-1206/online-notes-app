const nodemailer = require('../config/nodemailer');

module.exports.resetPassword = async function(user, token){
    try{   
        let link = `http://localhost:8000/reset-password/${token}`;
        
        const htmlString = nodemailer.renderTemplate({user: user, link: link}, '/reset_password.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: '"Online Notes" <tanmayjoshi0135@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Reset Password", // Subject line
            html: htmlString, // html body
        });
        console.log(info);
    }catch(err){
        console.log(err);
    }

}