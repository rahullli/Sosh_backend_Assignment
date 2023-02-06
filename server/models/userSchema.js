const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // token: {
    //     type: String
    // }
},{ timestamps : true },);

const users = mongoose.model("users", userSchema);

module.exports = users;
