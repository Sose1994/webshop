const MongoClient = require('mongodb').MongoClient;

const mongodburl = process.env.DB_URL;

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
});