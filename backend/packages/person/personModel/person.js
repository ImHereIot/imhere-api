const mongoose = require("mongoose");

const personModel = new mongoose.Schema({
  nomePessoa: { type: String, required: true },
  registro: { type: Number, required: true, unique: true },
  cadastradoAula: { type: Boolean, required: true },
  idNFC: { type: Number, required: true, unique: true},
  password: { type: String, required: true}
});

personModel.pre("save", (next) => {
  return next();
});


module.exports = mongoose.model("Person", personModel);