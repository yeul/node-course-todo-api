require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT; //no need to set || 3000 here bc dev/test environment has 3000 as default

const { ObjectID } = require('mongodb');
const mongoose = require('./db/mongoose.js');
const Todo = require('./models/todo.js');
const User = require('./models/user.js');
const authenticate = require('./middleware/authenticate.js');

var app = express();

app.use(bodyParser.json());

// POST /todos

app.post('/todos', authenticate, (req, res) => {
    var newTodo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos by id

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id
    var valid = ObjectID.isValid(id);

    if (!valid && id != null) {
        return res.status(404).send();
    } else {
        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });

    };

});

// DELETE /todos by id

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id
    var valid = ObjectID.isValid(id);

    if (!valid && id != null) {
        return res.status(404).send();
    } else {
        Todo.findOneAndDelete({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        });
    };
});

// PATCH /todos by id

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    var valid = ObjectID.isValid(id);

    if (!valid && id != null) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var newUser = new User(body);

    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email, password}

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

// DELETE /users

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
});

module.exports = { app };