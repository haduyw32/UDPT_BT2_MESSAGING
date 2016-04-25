var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/udpt';


function insertUser (data, callback) {
	var docOut = 1;
  	var insertDocument = function(db, callback) {
		db.collection('userInfo').insertOne( {
			"name": data.name,
			"_id": data.email,
			"pass": data.pass
		}, function(err, result) {
			if (err) {
				docOut = 0;
				callback();
				return;
			}
    		console.log("Inserted a document into the userInfo collection.");
    		callback();
  		});
	};

	var insertbegin = function(db) {
		db.collection('listFriend').insertOne( {
			"_id": data.email,
			"friend": []
		}, function(err, result) {
			if (err) {
				docOut = 0;
				return;
			}
  		});
	};

	MongoClient.connect(url, function(err, db) {
 		assert.equal(null, err);
 		insertbegin(db);
  		insertDocument(db, function() {
      		db.close();
      		callback(docOut);
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

function findFriend (data, callback) { //hoan thanh: 1, loi: 0
	var Out = 1;
	var findUser = function(db, callback) {
	var cursor =db.collection('userInfo').find( { name: data.txt } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			data.txt = doc._id;
			insertFriend(data);
			callback();
		} else {
			Out = 0;
			callback();
		}
	});
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findUser(db, function() {
			db.close();
			callback(Out);
		});
	});
}


function insertFriend (data) {
  	var insertDocument = function(db, callback) {
		db.collection('listFriend').update(
			{"_id": data.email}, {$addToSet: {"friend": data.txt}}
		, function(err, result) {
			if (err) { console.log(err);
				callback();
				return;
			}
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
exports.insertUser = insertUser;
exports.loginUser = loginUser;
exports.findFriend = findFriend;