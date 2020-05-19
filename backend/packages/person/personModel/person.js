const mongoose = require("mongoose");

const personModel = new mongoose.Schema({
  nomePessoa: { type: String, },
  registro: { type: Number, required: true, unique: true },
  idNFC: { type: Number,},
  tipoPessoa: { type: Number,},
  password: { type: String, required: true},
  email: { type: String, } 
});

personModel.pre("save", (next) => {
  return next();
});


module.exports = mongoose.model("Person", personModel);