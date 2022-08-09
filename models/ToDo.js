const mongoose = require('mongoose');

const ToDo = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    id : {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('ToDo', ToDo);