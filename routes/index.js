var express = require('express');
var router = express.Router();

module.exports = function(passport){
	//Home page with login and signup link
    router.get('/', function(req, res) {
        res.render('index', { title: '1 day GO' });
    });
    
    //login page shows the login form
    router.get('/login', function(req, res){
        res.render('login', { message: req.flash('loginMessage')});
    });
    
    //singup page shows the signup form
    router.get('/signup', function(req, res){
        res.render('signup', { message: req.flash('signupMessage')});
    });

    //log out and redirect to home page  
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //Before render the profile page, validate whether has logged in
    router.get('/profile', isLoggedIn, function(req, res){
        res.render('profile', { user: req.user});
    })
    
    //handle the signup form 
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash: true  //allow flash messages
    }));
    
    //handle the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        falureFlash: true  //allow flash messages
    }));
    
    //route middleware to make sure the user is logged in
    function isLoggedIn(req, res, next){

        if(req.isAuthenticated()){
            return next();
            //if user is authenticated in the session, carry on
        }
        else{
            res.redirect('/');
            //if users aren't, redirect them to the home page
        }
    }

    return router;
}


