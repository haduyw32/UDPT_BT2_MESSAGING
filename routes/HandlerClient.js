var db = require('../helpers/db');
var hash = require('../helpers/hash');

module.exports = function (app) {
	app.post('/addfriend', function (req, res) {
		req.on('data', function(chunk) {
      		var data = hash(chunk);
      		db.findFriend(data, function(out) {
				if (out == 0) {
					res.end('none');
				}
				else {
					res.end('done');
				}
			});
      		
      	});
    });
}
