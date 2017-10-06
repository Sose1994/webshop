const express = require('express');
const app = express();
//const app = require('express').express();

const MongoClient = require('mongodb').MongoClient;

const mongodburl = 'mongodb://sose:1234@cluster0-shard-00-00-vnc24.mongodb.net:27017,cluster0-shard-00-01-vnc24.mongodb.net:27017,cluster0-shard-00-02-vnc24.mongodb.net:27017/webshop-kea?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';



app.get('/customer', function(req, res)
{
	MongoClient.connect(mongodburl, function(err, db)
	{
	var col = db.collection('customer');

		//CRUD
		//Read All

		col.find().toArray(function (err, result)
		{
			//console.log(result);
			res.json(result);
		});
	})
		
	
});

app.listen(3500);

