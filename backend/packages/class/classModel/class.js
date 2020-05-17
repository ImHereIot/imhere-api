const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
  idAula: { type: String,  unique: true},
  nomeAula: { type: String,  uppercase: true },
  alunosCadastrados: { type: Array, },
  professor: { type: String, required: true },
  idProfessor: { type: Number, },
  idTurma: {type:String,},
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