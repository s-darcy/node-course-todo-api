const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = "59cac0bfb2d4b82f9c80f6e5";

// if (!ObjectId.isValid(id)) {
//     console.log('ID is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

//The code below indicated that the query works, but there is no user
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));
var id = '59cb23019a4401546f072929';

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Could not find that user');
    } 
    console.log('User by Id', user);
}).catch((e) => console.log(e));