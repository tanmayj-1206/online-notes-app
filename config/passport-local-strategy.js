const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/users');

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { 
            return done(err); 
        }
        if (!user || user.password != password) { 
            return done(null, false, {message: 'Invalid Username/Password'}); 
        }
        if(!user.verified){
            return done(null, false, {message: 'Account not verified'}); 
        }

        return done(null, user);
      });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;