var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/udpt';


function insertUser (data) {
  	var insertDocument = function(db, callback) {
		db.collection('userInfo').insertOne( {
			"name": data.name,
			"_id": data.email,
			"pass": data.pass
		}, function(err, result) {
    		assert.equal(err, null);
    		console.log("Inserted a document into the userInfo collection.");
    		callback();
  		});
	};

	MongoClient.connect(url, function(err, db) {
 		assert.equal(null, err);
  		insertDocument(db, function() {
      		db.close();
  		});
	});
}

function loginUser (data, callback) {
	var docOut;
	var findUser = function(db, callback) {
	var cursor =db.collection('userInfo').find( { _id: data.email, pass: data.pass } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			docOut = doc;
		} else {
			callback();
		}
	});
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findUser(db, function() {
			db.close();
			callback(docOut);
		});
	});
}

exports.insertUser = insertUser;
exports.loginUser = loginUser;