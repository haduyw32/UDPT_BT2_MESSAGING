var express = require('express');
var router = express.Router();




router.get('/', function(req, res) {
res.render('index.ect', { title: 'home', a: 'trang demo' });
});

router.get('/login', function(req, res) {
	res.render('login.ect', { title: 'Login' });
});

router.get('/signup', function(req, res) {
	res.render('signup.ect', { title: 'signup' });
});



module.exports = router;