const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose.js');
const Todo = require('./../server/models/todo.js');
const User = require('./../server/models/user.js');

var id = '5c5b3e3bfc0a400dc9faa333';
var valid = ObjectID.isValid(id);

if (!valid && id != null) {
    console.log('ID is not valid');
} else {
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return console.log('ID not found.')
        }
        console.log('Todo By ID', todo);
    });
};

// Using .find to query a todo id.

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Using .findOne to query a todo id.

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Using catch to show error.

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not found.')
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

var userID = '5c59fd7ccf61f95f94789310';

User.findById(userID).then((user) => {
    if (!user) {
        return console.log('Unable to find user.')
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});



