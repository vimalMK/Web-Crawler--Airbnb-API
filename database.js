
var MongoClient = require('mongodb').MongoClient,format=require('util').format;
var insertData=function(limit,id,name,room,price,superhost){
MongoClient.connect("mongodb://127.0.0.1:27017/turnkey", function (err, db) {
   var obj;
        if(err)

     	{      throw err;
     	}
     	else
     	{
        for(var i=0;i<limit;i++)
       {

        if (name[i]){
  			myobj = 
                {
                  rank:id,
                  HomeName: name[i],
                  Space: room[i], 
                  Price: price[i],
                  Superhost: superhost[i]
              };
  			db.collection("airbnb").insertOne(myobj, function(err, res) {
  			if (err) throw err;

      });
     }
        id++;
      }
}
    db.close();            
});
}
module.exports.insertData=insertData;

