var assert = require('assert');
module.exports={
   findDocuments : function(db,Name,Time, callback) {
    var collection = db.collection('Time');
    collection.updateOne({Name:Name},{
        Name:Name,
        Time,Time
    })
  }
}