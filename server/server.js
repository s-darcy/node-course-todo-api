var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status().send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 300');
});






//Saving to the MongoDB 
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// var secondTodo = new Todo({
//     text: 'Mow the lawn',
//     completed: false,
//     completedAt: 0
// });

// newTodo.save().then((doc) =>{
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

// secondTodo.save().then((doc) =>{
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });