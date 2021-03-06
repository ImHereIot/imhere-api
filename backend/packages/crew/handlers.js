const Crew = require("./crewModel/crew");
const crypto = require('crypto');
const handlers = {};

handlers.get = async (req, res) => {
  Crew.find({}, (err, docs) => {
    if (err) {
      return res.status(201).send({
        success: "true",
        err
      });
    }
    return res.status(201).send({
      success: "true",
      docs
    });
  });
};

handlers.post = async (req, res) => {
  const newCrew = {
    idTurma: req.body.idTurma,
    alunos: req.body.alunos
  };
  Crew.create(newCrew);
  return res.status(201).send({
    success: "true",
    message: "classe Criada com Sucesso",
    newCrew
  });
};

handlers.put = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da Aula é necessário"
    });
  }
  const crewToUpdate = {
    idAula:req.body.idAula,
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
    idNFC: req.body.idNFC
  }
  await Crew.updateOne(crewToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Aula atualizada com Sucesso",
    crewToUpdate
  });
};

handlers.delete = async (req, res) => {
  const {idTurma} = req.params;

  const crewToDelete = {
    idTurma : req.body.idTurma
  };
  
  var deletedClass = await Crew.findOneAndDelete({idTurma: idTurma });

  Crew.deleteOne(crewToDelete);
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    crewToDelete
  });
};

module.exports = handlers;
