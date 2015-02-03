var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    res.redirect("/dashboard");
  else
    next();
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
	res.render('index');
});

router.post('/', ensureAuthenticated, passport.authenticate('local',
	{ 	
		successRedirect: '/dashboard',
    	failureRedirect: '/'
    }
));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
})
router.get('/register', ensureAuthenticated, function(req, res) {
		res.render('register');
});

router.post('/register', ensureAuthenticated, function(req, res) {
	if(req.body.firstname && req.body.lastname && req.body.email && req.body.password){
		req.body.password = createHash(req.body.password);
		User.create(req.body, function(err, user){
			if(user){
				req.login(user, function(err){
					res.redirect('/dashboard');
				});
			}
		});
	}else{
		res.redirect('back');
	}	
});

router.get('/dashboard', function(req,res){
	if(req.isAuthenticated()){
		res.render('dashboard', {user : req.user});
	}else{
		res.redirect('/');
	}	
});

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = router;
