'use strict';

var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;


module.exports = {
	connect() {
		client.connect('mongodb://localhost:27017/olympics-dev', (err, db) => {
	 if (err) {  
	 	console.log("\n !Error! connecting to Mongo \n");
		process.exit(1);
	}
	_db = db;
	console.log("\n Connected to Mongo \n");
	});	
   },
   sports(){
   		return _db.collection("sports");
   }
}
