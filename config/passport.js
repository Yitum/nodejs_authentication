var LocalStrategy = require('passport-local');
var User = require('../models/user');

module.exports = function(passport){
    
    //=====================passport session setup======================
    //To support login session
    //passport need to serialize and deserialize user instance to and from session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    //=====================signup=========================== 

    //signup strategies configuration
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override username with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true  //allow to pass back entire requrest to the callback
    },
    function(req, email, password, done){
        //asynchronous
        //keep sure that callback function won't be fired unless data is sent back
        process.nextTick(function(){
            
            //check whether the email has existed in database
            User.findOne({ 'local.email' : email}, function(err, user){
                
                //if there is any server exception, done should be invoked with err
                if(err){ return done(err); }
                
                //if there is a user using the email, done should be invoked with false and additional info message
                if(user){
                    return done(null, false, req.flash('signupMessage', 'This email has already existed.'));
                }
                else{
                    //if no one use the email, create a new instance of User
                    var newUser = new User();
                    
                    newUser.local.name.firstname = req.body.firstname;
                    newUser.local.name.lastname = req.body.lastname;
                    //newUser.local.name.push([req.body.firstname, req.body.lastname]);
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        //invoke done to supply Passport with the user
                        return done(null, newUser);
                    });

                }
            });
        });
        
    }
    ));

    //============login================

    passport.use('local-login', new LocalStrategy({

        // by default, local strategy uses username and password, we will override username with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true  //allow to pass back entire requrest to the callback
    },
    //callback with email and password from the login form
    function(req, email, password, done){
        //asynchronous
        //keep sure that callback function won't be fired unless data is sent back
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err, user){

                //if there is any server exception, done should be invoked with err
                if(err){return done(err);}

                //if there is no user exist, return done with message
                if(!user){
                    return done(null, false, req.flash('loginMessage', 'User not exists.'));
                }
                
                //if the input password is not authenticated, return messgae
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Wrong password. '));
                }
                else{
                    //all correct return user object
                    return done(null, user);
                }
            });
        });
    }
    ));
};