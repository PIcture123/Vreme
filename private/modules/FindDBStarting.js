var assert = require('assert');
module.exports={
   findDocuments : function(db,Name, callback) {
    var collection = db.collection('Time');
    collection.find({Name:Name}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  }
}
