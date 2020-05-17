const Class = require("./classModel/class");
const crypto = require('crypto');
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
    idAula: crypto.randomBytes(20).toString('HEX'),
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
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
  const putfilter = {idAula: req.params}
  
  const classToUpdate = {
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
  await Class.findOneAndUpdate(putfilter, classToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Aula atualizada com Sucesso",
    classToUpdate
  });
};

handlers.delete = async (req, res) => {
  const {idAula} = req.params;
  
  var deletedClass = await Class.findOneAndDelete({idAula: idAula });
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    deletedClass
  });
};

module.exports = handlers;
