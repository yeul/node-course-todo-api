const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);


