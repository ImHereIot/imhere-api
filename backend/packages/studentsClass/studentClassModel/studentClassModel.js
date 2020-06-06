const mongoose = require("mongoose");

const studentsClass = new mongoose.Schema({
  idAula: { type: String, required: true },
  idPessoa: { type: Number, required: true },
  nomePessoa: { type: String, required: true },
  presenca: { type: Number, required: true },
  data: { type: Date },
});

studentsClass.pre("save", (next) => {
  return next();
});


module.exports = mongoose.model("StudentsClass", studentsClass);