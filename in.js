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


// ===================
// Products ===========
// ====================
// READ (all)
app.get('/products', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {

        var col = db.collection('product');
        // Read All
        col.find().toArray(function (err, result) {
            //res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result);
        });
        db.close();
    });
});

// READ (one)
app.get('/products/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('product');

        col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.json(result);
        })
        db.close();
    });
});

// CREATE
app.post('/products/', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('product');

        col.insertOne(req.body, function (err, result) {
            //res.status(201);
            res.json({ msg: 'Customer Created' });
        })
        db.close();
    });
});

// DELETE
app.delete('/products/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('product');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            //res.status(204);
            res.json();

        });

        db.close();
    });
});


// UPDATE
app.put('/products/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('product');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                //res.status(204);
                res.json();
            });
            db.close();
        });
    });


// UPDATE
app.put('/customers/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('customer');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                //res.status(204);
                res.json();
            });
            db.close();
        });
    });

//ORDERS

//Read all
app.get('/orders', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {

        var col = db.collection('order');
        // Read All
        col.find().toArray(function (err, result) {
            //res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result);
        });
        db.close();
    });
});

// READ (one)
app.get('/orders/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('order');

        col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            res.json(result);
        })
        db.close();
    });
});

// CREATE
app.post('/orders/', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('order');

        col.insertOne(req.body, function (err, result) {
            //res.status(201);
            res.json({ msg: 'Customer Created' });
        })
        db.close();
    });
});

// DELETE
app.delete('/orders/:id', function (req, res) {

    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('order');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
            //res.status(204);
            res.json();

        });

        db.close();
    });
});


// UPDATE
app.put('/orders/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('order');
    
            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result){
                //res.status(204);
                res.json();
            });
            db.close();
        });
    });


app.listen(process.env.PORT || 3500);

