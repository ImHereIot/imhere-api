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
  if (!req.body.professor) {
    return res.status(400).send({
      success: "false",
      message: "O professor é necessário"
    });
  }


  const newClass = {
    idAula: req.body.idAula,
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
    idNFC: req.body.idNFC,
    idTurma: req.body.idTurma,
    sala: req.body.sala,
    unidade: req.body.unidade,
    data: req.body.data,
    horario: req.body.horario,
    detalhe: req.body.detalhe,
    nomeAula: req.body.nomeAula,
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
    idAula: req.body.idAula,
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
    idNFC: req.body.idNFC,
    idTurma: req.body.idTurma,
    sala: req.body.sala,
    unidade: req.body.unidade,
    data: req.body.data,
    horario: req.body.horario,
    detalhe: req.body.detalhe,
  }
  await Class.updateOne(classToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Aula atualizada com Sucesso",
    classToUpdate
  });
};

handlers.delete = async (req, res) => {
  const {idAula} = req.params;
  console.log(idAula)
  
  var deletedClass = await Class.findOneAndDelete(idAula);
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    deletedClass
  });
};

module.exports = handlers;
