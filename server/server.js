const { ObjectID } = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log('inside post method');
    console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });
    console.log('before save');
    todo.save().then((doc) => {
      console.log('before send doc');
      res.send(doc);
      console.log('after send doc');
    }, (e) => {
      console.log('inside error');
      // console.log(e);
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    return res.status(200).send({todo});
  }).catch((e) => {
    return res.status(400).send();
  });
})

app.listen(3002, () => {
  console.log('Started on port 3002');
});

module.exports = { app };
