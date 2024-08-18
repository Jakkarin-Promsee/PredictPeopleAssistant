const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    dater: String,
    time: String,
    number_people: Number
});

const Data = mongoose.model('Working', dataSchema, 'Area1');

module.exports = Data;
