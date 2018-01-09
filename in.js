const express = require('express');
const app = express();
const patthh = require('path');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongodburl = process.env.DB_URL;

const publicPath = __dirname + '/public';

app.use(express.static('public'));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res)
{
	res.sendFile(publicPath + '/homepage.html');
});

/*app.get('/stuffies', function(req, res)
{
	res.sendFile(publicPath + '/index.html');
});

app.get('/cuteness', function(req, res)
{
	res.sendFile(publicPath + '/cuteness.html');
});

*/
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


app.listen(process.env.PORT || 3500);

