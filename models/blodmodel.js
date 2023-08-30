const mongoose = require('mongoose');

const blodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "blod required"],
        lowercase: true,
        unique: [true, "blod must be unique"],
    },
});

const Blodmodel = mongoose.model('Blod', blodSchema);

module.exports = Blodmodel;


