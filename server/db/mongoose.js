const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }); //useNewUrlParser to avoid deprecation error

module.exports = { mongoose };


