const mongoose = require("mongoose");
const validator = require("validator");

const blogPostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }

});

const blogs = mongoose.model("blogs", blogPostSchema);

module.exports = blogs;