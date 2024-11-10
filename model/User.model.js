const mongoose = require('mongoose');

// Create Schema
const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Create Model
const UserModel = mongoose.model('users', UserSchema);

module.exports = {
    UserModel
};