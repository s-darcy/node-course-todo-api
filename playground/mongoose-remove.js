const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) - you must have the curly braces object inorder to remove everything
// Todo.remove({}). then((result) => {
//     console.log(result);
// });

//this will remove the first document that it finds. THis will return the doc
// Todo.findOneAndRemove()

//this one works just like findById, you pass in the ID as the argument and remove it. THis will return the doc
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('59cd07309a4401546f074b8d').then((todo) => {
    console.log(todo);
});