var mongoose = require('mongoose');

var user_schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = mongoose.model("User", user_schema);

module.exports = User;