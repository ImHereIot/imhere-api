const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
  idAula: { type: Number,  unique: true},
  nomeAula: { type: String,  lowercase: true },
  alunosCadastrados: { type: Array, },
  professor: { type: String, required: true },
  idNFC: {type:String,},
  idTurma: {type:String, },
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