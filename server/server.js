const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const mongoose = require('./db/mongoose.js');
const Todo = require('./models/todo.js');
const User = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
});

module.exports = { app };