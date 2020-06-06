const handlers = {};
const studentClass = require("./studentClassModel/studentClassModel");

handlers.get = async (req, res) => {
  var requisicao = req.params.idAula;
  var resultSplit = requisicao.split('|');

  var idAula = resultSplit[0];
  idAula.toString();

  var idPessoa = resultSplit[1];
  idPessoa = parseInt(idPessoa);
  
  

  //trazer dados de alunos cadastrados em uma aula
 
  studentClass.find({idAula : idAula, idPessoa : idPessoa }, (err, docs) => {
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

handlers.getStudents = async (req, res) => {
  const { idAula } = req.params;

  studentClass.find({ idAula: idAula }, (err, docs) => {
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
  })
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
    idAula: req.body.idAula,
    idPessoa: req.body.idPessoa,
    nomePessoa: req.body.nomePessoa,
    data: req.body.data,
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
  var requisicao = req.params.idAula;
  var resultSplit = requisicao.split('|');

  var idAula = resultSplit[0];
  idAula.toString();
  
  var idPessoa = resultSplit[1];
  idPessoa = parseInt(idPessoa);

  const studentsClassToUpdate = {
    // nomePessoa: req.body.idAula,
    // idPessoa: req.body.idPessoa,
    // data: req.body.data,
    presenca: req.body.presenca,
  }
  await studentClassModel.findOneAndUpdate({ idAula: idAula }, studentsClassToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Atualizada com Sucesso",
    studentsClassToUpdate
  });
};

handlers.delete = async (req, res) => {
  const { idAula } = req.params;

  var deletedStudentClass = studentClassModel.findOneAndDelete({ idAula: idAula });
  return res.status(201).send({
    success: "true",
    deletedStudentClass
  });
};


module.exports = handlers;