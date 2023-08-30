const mongoose = require('mongoose');

const dairaSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "code required"],
  },
  name: {
    type: String,
    required: [true, "name required"],
    lowercase: true,
    unique: [true, "name must be unique"],
  },
});

const wilayaSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "code required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name required"],
    lowercase: true,
    unique: [true, "name must be unique"],
  },
  dairas: [dairaSchema],
});

const Wilayamodel = mongoose.model('Wilaya', wilayaSchema);

module.exports = Wilayamodel;


