const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const { ObjectID } = require('mongodb');
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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    var valid = ObjectID.isValid(id);

    if (!valid && id != null) {
        return res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });

    };

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id
    var valid = ObjectID.isValid(id);

    if (!valid && id != null) {
        return res.status(404).send();
    } else {
        Todo.findByIdAndDelete(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });
    };
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
});

module.exports = { app };