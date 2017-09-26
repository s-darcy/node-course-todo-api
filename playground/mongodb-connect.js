// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this is in destructuring syntax. 

//This let's Mongo create unique ObjectId's for us
// var obj = new ObjectID();
// console.log(obj);

//destructuring - taking out a property from an object and turning it into a variable
// var user = {name: 'shane', age: 32};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

//Insert new doc into User (name, age location)
    // db.collection('Uers').insertOne({
    //     name: "Shane",
    //     age: 32,
    //     location: "Charlotte"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Could not find user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimeStamp());
    // });

    db.close(); //this closes the MongoDB server
});