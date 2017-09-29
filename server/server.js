require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {    
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req,res) => {
    //get the id
        var id = req.params.id;
    //validate the id-> not valid? return 404
        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        }

    //remove todo by id
        Todo.findByIdAndRemove(id).then((todo) => {
        //success
            //if no doc, send 404

            if (!todo) {
                return res.status(404).send();
            }
            //if doc, send doc back with 200
            res.send({todo});
            
        //error
            //400 with empty body   
        }).catch((e) => {
            res.status(400).send();
        });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completeAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completeAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
        }).catch((e) => {
            res.status(404).send();
        }) 
    });

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};




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