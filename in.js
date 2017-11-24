const express = require('express');
const app = express();
const patthh = require('path');
//const app = require('express').express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongodburl = 'mongodb://sose:1234@cluster0-shard-00-00-vnc24.mongodb.net:27017,cluster0-shard-00-01-vnc24.mongodb.net:27017,cluster0-shard-00-02-vnc24.mongodb.net:27017/webshop-kea?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

const publicPath = __dirname + '/public';

app.use(express.static('public'));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/stuffies', function(req, res)
{
	res.sendFile(publicPath + '/index.html');
});

app.get('/cuteness', function(req, res)
{
	res.sendFile(publicPath + '/cuteness.html');
});

app.get('/customerlist', function(req, res)
{
	res.sendFile(publicPath + '/customerlist.html');
});

//Read all
app.get('/customer', function(req, res)
{
	MongoClient.connect(mongodburl, function(err, db)
	{
	var col = db.collection('customer');

		col.find().toArray(function (err, result)
		{
			//console.log(result);
			res.json(result);
		});
		db.close();
	});
});

//Read One
app.get('/customer/:id', function (req, res)
{
	MongoClient.connect(mongodburl, function(err, db)
	{
		var col = db.collection('customer');

		col.findOne({ '_id': ObjectId(req.params.id) }, function(err, result)
		{
			res.json(result);
		});

		db.close();
	});
});

//Create
app.post('/customer', function (req, res)
{
	MongoClient.connect(mongodburl, function(err, db)
	{
		var col = db.collection('customer');

		col.insertOne(req.body, function(err, result)
		{
			res.status(201);
			res.json( {msg : 'Customer Created'} );
			console.log(req.body);
		});

		db.close();
	});
});


//Delete
app.delete('/customer/:id', function(req, res)
{
	MongoClient.connect(mongodburl, function(err, db)
	{
		var col = db.collection('customer');

		col.remove({_id: ObjectId(req.params.id)}, function(err, result)
		{
			res.json({ msg : 'Customer deleted'});
		});
	})
})



app.listen(3500);
