const mongoose = require("mongoose");

const studentsClass = new mongoose.Schema({
  idAula: { type: String, required: true },
  idPessoa: { type: String, required: true },
  nomePessoa: { type: String, required: true },
  presenca: { type: Number, required: true },
  data: { type: String, required: true },
});

studentsClass.pre("save", (next) => {
  return next();
});


module.exports = mongoose.model("StudentsClass", studentsClass);