
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
var url = require("url");
var db = require('../helpers/db');
var hash = require('../helpers/hash');


module.exports = function (app) {

	app.post('/', function (req, res, next) {

	});

	app.get('/', function(req, res) {
		res.render('index.ect', {  });
	});

	app.post('/signup', function (req, res, next) {
		req.on('data', function(chunk) {
      		var data = hash(chunk);
      		if (data.submit == "Login") {
      			res.render('login.ect', { });
      			return;
      		}
      		if (data.email == '' || data.pass == '' || data.name == '') {
      			console.log('Thieu thong tin dang ki');
      			res.render('signup.ect', { ShowCaution1: true }); //thieu thong tin
				return;
			}
			db.insertUser(data, function(doc) {
				if (doc == 0) {
					invalid ();
				}
				else {
					res.redirect('/login');
				}
			});
      	})

		function invalid () {
			return res.render('signup.ect', { ShowCaution: true }); //ten dang nhap da ton tai
		}
	});
//-----------------------------------------------------------
	app.post('/login', function (req, res, next) {
		
		req.on('data', function(chunk) {
      		var data = hash(chunk);
      		if (data.submit == "Register") {
      			res.render('signup.ect', { });
      			return;
      		}
      		if (data.email == '' || data.pass == '') {
      			console.log('Thieu thong tin');
				return invalid();
			}
			db.loginUser(data, function(doc) {
				if (doc == null) {
					invalid ();
				}
				else {
					res.render('index.ect', { wuser: doc._id, wpass: doc.pass, wname: doc.name });
				}
			});
			
      	})
      	function invalid () {
			return res.render('login.ect', { ShowCaution: true });
		}
	});
}

