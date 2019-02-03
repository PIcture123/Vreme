var assert = require('assert');
module.exports ={
 insertDocuments : function(db,Name,Time, callback) {
    var collection = db.collection('Time');

    collection.insertMany([
      {
        Name:Name,
        Time:Time
      }
    ], function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document into the collection");
      callback(result);
    });
  }
}
