const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
  idAula: { type: String, required: true, unique: true, lowercase: true },
  alunosCadastrados: { type: Array, required: true},
  professor: { type: String, required: true },
  idNFC: {type:String, required:true, unique:true },
  idTurma: {type:String, required:true },
  sala: {type:String},
  unidade: {type:String},
  data: {type:String},
  horario: {type:String},
  detalhe: {type:String},
});

classModel.pre("save", (next) => {
  return next();
});

module.exports = mongoose.model("Class", classModel);