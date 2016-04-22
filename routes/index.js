var express = require('express');
var router = express.Router();
var login = require('./login');



router.get('/', function(req, res) {
res.render('index.ect', { title: 'home', a: 'trang demo' });
});

router.get('/login', function(req, res) {
	res.render('login.ect', { title: 'Login' });
});

router.get('/signup', function(req, res) {
	res.render('signup.ect', { title: 'signup' });
});

login(router);

module.exports = router;