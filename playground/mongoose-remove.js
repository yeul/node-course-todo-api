const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose.js');
const Todo = require('./../server/models/todo.js');
const User = require('./../server/models/user.js');

// Todo.delete({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndDelete('5c5dda0a504b0906ee16920d').then((todo) => {
    console.log(todo)
});

Todo.findOneAndDelete({ _id: '5c5dda0a504b0906ee16920d' }).then((todo) => {
    console.log(todo)
});

// NOTE: the "remove" methods have been deprecated. i.e. .findByIdAndRemove, .remove, and findOneAndRemove