


var url = require("url");
var db = require('../helpers/db');
var hash = require('../helpers/hash');

module.exports = function (app) {


	
	app.post('/signup', function (req, res, next) {
		req.on('data', function(chunk) {
      		var data = hash(chunk);
      		if (data.email == '' || data.pass == '' || data.name == '') {
      			console.log('Thieu thong tin dang ki');
				return invalid();
			}
			db.insertUser(data);
      	})

		function invalid () {
			return res.render('signup.ect', { title: 'signup' });
		}
	});
//-----------------------------------------------------------
	app.post('/login', function (req, res, next) {
		var data = {};
		req.on('data', function(chunk) {
      		var data = hash(chunk);
      		if (data.submit == "Register") {
      			res.render('signup.ect', { title: 'signup' });
      			return;
      		}
      		if (data.email == '' || data.pass == '') {
      			console.log('Thieu thong tin');
				return invalid();
			}
			db.loginUser(data, function(doc) {
				if (doc == null)
					invalid ();
			});
			
      	})
      	function invalid () {
			return res.render('login.ect', { ShowCaution: true });
		}
	});
}

