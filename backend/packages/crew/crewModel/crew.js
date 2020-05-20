const mongoose = require("mongoose");

const crewModel = new mongoose.Schema({
  idTurma: {type:String, required:true, unique:true },
  alunos : {type:Array, required:true },
});

crewModel.pre("save", (next) => {
  return next();
});

module.exports = mongoose.model("Crew", crewModel);