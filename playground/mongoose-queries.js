const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = "59cac0bfb2d4b82f9c80f6e5";

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});