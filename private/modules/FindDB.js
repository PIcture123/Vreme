var assert = require('assert');
module.exports={
  findDocuments : function(db, callback) {
    var collection = db.collection('Time');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  }
}
