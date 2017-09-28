const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => done());
// });

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));   
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);   
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);    
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
                return done (err);
            }
            // query database using findById. You can make sure that something does not exist with the toNotExist assertion
            Todo.findById(hexId).then((todo) => {
                //expect(null).toNotExist
                expect(todo).toNotExist();
                done();
            //add catch clause
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done);  
    });

    it('should return 404 if onject id is invalid', (done) => {
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it ('should update the todo', (done) => {
        //grab id of first item
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text';
        //update text, set complete true
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
        //200
        .expect(200)
        //text is changed, completed is true, completeAt is a number .tobeA
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });


    it ('should clear completeAt when todo is not completed', (done) => {
        //grab id of second todo item
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be the newer text!!';
        //update text, set complete to false
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
        //200
        .expect(200)
        //text is changed, complete false, completeAt is null .toNotExist
        .expect((res) => {
            expect(body.res.todo.text).toBe(text);
            expect(body.res.todo.complete).toBe(false);
            expect(body.res.todo.completedAt).toNotExist();
        })
        .end(done);
    });
});