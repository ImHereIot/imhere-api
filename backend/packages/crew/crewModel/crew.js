const mongoose = require("mongoose");

const crewModel = new mongoose.Schema({
  idTurma: {type:Number, required:true, unique:true },
  nomeTurma : {type:String, required:true },
  alunos : {type:Array, required:true }, 
});

crewModel.pre("save", (next) => {
  return next();
});

module.exports = mongoose.model("Crew", crewModel);