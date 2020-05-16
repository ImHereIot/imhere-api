const Class = require("./classModel/class");
const handlers = {};

handlers.get = async (req, res) => {
  // if (!req.body.idAula) {
  //   const classToFind = { idAula : req.body.idAula }
  //   Class.findOne(classToFind, (err, docs) => {
  //     if (err) {
  //       return res.status(201).send({
  //         success: "true",
  //         err
  //       });
  //     }
  //     return res.status(201).send({
  //       success: "true",
  //       docs
  //     });
  //   });
  // }
  console.log(req);
  Class.find({}, (err, docs) => {
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
  if (!req.query.professor) {
    return res.status(400).send({
      success: "false",
      message: "O professor é necessário"
    });
  }

  console.log(req);

  const newClass = {
    idAula: req.query.idAula,
    nomeAula: req.query.nomeAula,
    alunosCadastrados: req.query.alunosCadastrados,
    professor: req.query.professor,
    idNFC: req.query.idNFC,
    idTurma: req.query.idTurma,
    sala: req.query.sala,
    unidade: req.query.unidade,
    data: req.query.data,
    horario: req.query.horario,
    detalhe: req.query.detalhe,

  };
  Class.create(newClass);
  return res.status(201).send({
    success: "true",
    message: "Aula Criada com Sucesso",
    newClass
  });
};

handlers.put = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da Aula é necessário"
    });
  }
  console.log(req);
  const classToUpdate = {
    idAula:req.body.idAula,
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
    idNFC: req.body.idNFC
  }
  await Class.updateOne(classToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Aula atualizada com Sucesso",
    classToUpdate
  });
};

handlers.delete = async (req, res) => {
  if (!req.query.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da aula é necessário"
    });
  }
  console.log(req);
  const classToDelete = {
    idAula : req.body.idAula
  };
  Class.deleteOne(classToDelete);
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    classToDelete
  });
};

module.exports = handlers;
