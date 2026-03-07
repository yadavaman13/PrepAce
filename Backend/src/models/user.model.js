const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username is already taken"],
        require: true
    },

    email: {
        type: String,
        unique: [true, "Account with this email already exists"],
        require: true
    },

    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;