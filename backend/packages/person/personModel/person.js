const mongoose = require("mongoose");

const personModel = new mongoose.Schema({
  nomePessoa: { type: String, required: true, unique: true, lowercase: true },
  registro: { type: Number, required: true, select: false },
  cadastradoAula: { type: Boolean, required: true },
  idNFC: {type: Number, required: true, unique: true}
});

personModel.pre("save", (next) => {
  return next();
});

personModel.index({nomePessoa: 'text', 'Registro': 'text', 'cadastradoAula': 'bool'});

module.exports = mongoose.model("Person", personModel);