const User = require('../model/users');
const crypto = require('crypto');
const verificationMailer = require('../mailers/verify_email');
const UpdateEmail = require('../model/updateEmailVerification');
const passport = require('passport');

module.exports.getProfilePage = async function(req, res){
    try{
        let user = await User.findById(req.user.id);
        return res.render('profile', {user: user, title: 'Online Notes | My Profile'})
    }catch(err){
        console.log(err);
    }
}

module.exports.updateUsername = async function(req, res){
    try{
        let user = await User.findByIdAndUpdate(req.user.id, {name: req.body.name});
        return res.status(200).json({
            message: 'Username updated!!'
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Error in updating username!!'
        })
    }
}

module.exports.updatePassword = async function(req, res){
    try{
        let user = await User.findById(req.user.id);
        if(req.body.currentPassword != user.password){
            return res.status(422).json({
                message: 'Incorrect Password!!! Please enter correct password.'
            })
        }
        if(req.body.password != req.body.confirmPassword){
            return res.status(422).json({
                message: "Passwords doesn't match!!"
            })
        }

        await User.findByIdAndUpdate(req.user.id, {password: req.body.password});

        return res.status(200).json({
            message: 'Password updated successfully'
        })
    }catch{
        console.log(err);
        return res.status(500).json({
            message: 'Error in updating password!!'
        })
    }
}

module.exports.updateEmail = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        
        if(user){
            return res.status(422).json({
                message: 'Email already in use'
            });
        }
        
        let token = crypto.randomBytes(20).toString('hex');
        await UpdateEmail.findOneAndDelete({user: req.user.id});
        let updateEmail = await UpdateEmail.create({
            user: req.user.id,
            token: token,
            newEmail: req.body.email
        });
        user = await User.findById(req.user.id);
        let link = `/verify-email/${token}`

        verificationMailer.verifyAccount(user, link, updateEmail);
        req.logout();
        if(req.xhr){
            return res.status(200).json({
                message: 'email sent'
            });
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Error in updating email!!'
        })
    }
}

module.exports.verifyEmail = async function(req, res){
    try{
        let token = req.params.token;

        let verify = await UpdateEmail.findOne({token: token});

        if(!verify){
            return res.render('verified', {layout: false, title: 'Online Notes | Email verification', error: true})
        }

        let user = await User.findOneAndUpdate({_id: verify.user}, {email: verify.newEmail});
        await UpdateEmail.findOneAndDelete({token: token})

        return res.render('verified', {layout: false, title: 'Online Notes | Email verification', error: false})

    }catch(err){
        console.log(err);
    }
}