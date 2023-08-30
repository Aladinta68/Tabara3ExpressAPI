const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Category required"],
        unique: [true, "Category must be unique"],
        trim: true,
        lowercase: true,
    },
    phonenumber: {
        type: String,
        required: [true, "phonenumber required"],
        unique: [true, "phonenumber must be unique"],
        minlength: [10, "wrong phonenumber"],
        maxlength: [10, "wrong phonenumber"],
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "too short password"],
        maxlength: [20, "too long password"],
    },
    blod: {
        type: String,
        required: [true, "blod required"],
        lowercase: true,

    },
    wilaya: {
        type: String,
        required: [true, "wilaya required"],
        lowercase: true,

    },
    daira: {
        type: String,
        required: [true, "daira required"],
        lowercase: true,

    }
}, { timestamps: true })

const Usermodel = mongoose.model('User', UserSchema);

module.exports = Usermodel