const handlers = {};
const studentClassModel = require("./studentClassModel/studentClassModel");

handlers.get = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O idAula é necessário"
    });
  }
  const studentClassToFind  = {
    idAula : req.body.idAula
  }
  const foundStudentsClass = studentClassModel.find(studentClassToFind , (err, docs) => {
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
      message: "O idAula é necessário"
    });
  } else if (!req.body.idPessoa) {
    return res.status(400).send({
      success: "false",
      message: "O idPessoa na aula é necessário"
    });
  } else if (!req.body.data) {
    return res.status(400).send({
      success: "false",
      message: "A data é necessária"
    });
  }

  const newStudentsClass = {
    nomePessoa: req.body.idAula,
    idPessoa: req.body.idPessoa,
    data: req.body.Data,
    presenca: 1,
  };
  studentClassModel.create(newStudentsClass);
  return res.status(201).send({
    success: "true",
    message: "estudanteAula Criada com Sucesso",
    newStudentsClass
  });
};

handlers.put = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O idAula é necessário"
    });
  } else if (!req.body.idPessoa) {
    return res.status(400).send({
      success: "false",
      message: "O idPessoa na aula é necessário"
    });
  } 
  const studentsClassToUpdate = {
    nomePessoa: req.body.idAula,
    idPessoa: req.body.idPessoa,
    data: req.body.data,
    presenca: req.body.presenca,
  }
  await studentClassModel.updateOne(studentsClassToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Atualizada com Sucesso",
    studentsClassToUpdate
  });
};

handlers.delete = async (req, res) => {
  if (!req.body.idAula) {
    return res.status(400).send({
      success: "false",
      message: "O idAula é necessário"
    });
  }
  const studentsClassToDelete = {
    registro: req.body.idAula,
  };
  studentClassModel.deleteOne(studentsClassToDelete);
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    studentsClassToDelete
  });
};


module.exports = handlers;