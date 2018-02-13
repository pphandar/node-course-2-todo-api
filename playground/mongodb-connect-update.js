// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5a82f800bf634ec855096a8c")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //     returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5a738a3b652611d209124486")
  }, {
    $set: {
      name: 'Preetpal'
    },
    $inc: {
      age: 1
    }
  }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });


  // db.close();
});
