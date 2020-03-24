const mongoose = require("mongoose");

const classModel = new mongoose.Schema({
  idAula: { type: String, required: true, unique: true, lowercase: true },
  alunosCadastrados: { type: String, required: true, select: false },
  professor: { type: String, required: true },
  idNFC: {type:Number, required:true, unique:true }
});

classModel.pre("save", (next) => {
  return next();
});

classModel.index({nomeAluno: 'text', 'Registro': 'text', 'cadastradoAula': 'bool'});

module.exports = mongoose.model("Class", classModel);