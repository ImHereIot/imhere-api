const Crew = require("./crewModel/crew");
const crypto = require('crypto');
const handlers = {};

handlers.get = async (req, res) => {
  // if (!req.body.idTurma) {
  //   return res.status(400).send({
  //     success: "false",
  //     message: "O id da turma é necessário"
  //   });
  // }
  // const crewToFind = {
  //   idTurma : req.body.idTurma
  // }
  // Crew.findOne(crewToFind, (err, docs) => {
  //   if (err) {
  //     return res.status(201).send({
  //       success: "false",
  //       err
  //     });
  //   }
  //   return res.status(201).send({
  //     success: "true",
  //     docs
  //   });
  // });

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
    if (!req.body.nomeTurma) {
    return res.status(400).send({
      success: "false",
      message: "O nome da turma  é necessário"
    });
  }
  const newCrew = {
    idTurma: crypto.createHash('sha1').digest('hex'),
    nomeTurma: req.body.nomeTurma,
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
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da aula é necessário"
    });
  }
  const crewToDelete = {
    idAula : req.body.idAula
  };
  Crew.deleteOne(crewToDelete);
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    crewToDelete
  });
};

module.exports = handlers;
