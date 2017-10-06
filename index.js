const MongoClient = require('mongodb').MongoClient;

const mongodburl = 'mongodb://sose:1234@cluster0-shard-00-00-vnc24.mongodb.net:27017,cluster0-shard-00-01-vnc24.mongodb.net:27017,cluster0-shard-00-02-vnc24.mongodb.net:27017/webshop-kea?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

MongoClient.connect(mongodburl, function(err, db)
{
	if (err) 
	{
		console.log(err);
	}
	else
	{
		console.log('Connected to db: ' + db.databaseName);
	}
})