const Class = require("./classModel/class");
const handlers = {};

handlers.get = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da aula é necessário"
    });
  }
  const classToFind = {
    idAula : req.body.idAula
  }
  Class.findOne(classToFind, (err, docs) => {
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
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da aula é necessário"
    });
  } else if (!req.body.alunosCadastrados) {
    return res.status(400).send({
      success: "false",
      message: "O cadastro dos alunos na aula é necessário"
    });
  } else if (!req.body.professor) {
    return res.status(400).send({
      success: "false",
      message: "O professor é necessário"
    });
  }
  else if (!req.body.idNFC) {
    return res.status(400).send({
      success: "false",
      message: "A Tag NFC é necessário"
    });
  }

  const newClass = {
    idAula: req.body.idAula,
    alunosCadastrados: req.body.alunosCadastrados,
    professor: req.body.professor,
    idNFC: req.body.idNFC
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
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O id da aula é necessário"
    });
  }
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
