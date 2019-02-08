const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); //useNewUrlParser to avoid deprecation error

module.exports = { mongoose };


