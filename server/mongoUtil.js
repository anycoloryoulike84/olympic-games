'use strict';

var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;


module.exports = {
	connect() {
		client.connect('mongodb://localhost:27017/olympics-dev', (err, db) => {
	 if (err) {  
	 	console.log("Error connecting to mongod");
		process.exit(1);
	}
	_db = db;
	console.log("Connected to Mongo");
	
	});	
   }
}
