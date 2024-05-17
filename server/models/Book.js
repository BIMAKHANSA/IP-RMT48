const mongoose = require('../db');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    favorite : {
        type: Boolean,
        default: false
    },
    firstPublishYear: Number,
});

module.exports = mongoose.model('Book', bookSchema);

