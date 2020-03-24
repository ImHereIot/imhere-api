const handlers = {};
const Students = require("./personModel/person");

handlers.list = async (req, res) => {
  if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O registro é necessário"
    });
  }
  const registro = {
    registro: req.body.registro,
    nomePessoa: req.body.nomePessoa
  }
  const foundPerson =  Students.findOne(registro,(err, docs)=> {
    if(err) {
      return err
    }
    return docs
  });
  console.log(foundPerson);
  if(foundPerson != '') {
    return res.status(201).send({
      success: "true",
      registro
    })
  }
  return res.status(204).send({
    success:"false",
    message: "Nenhum registro foi encontrado"
  })
};

handlers.create = async (req, res) => {
  if (!req.body.nomePessoa) {
    return res.status(400).send({
      success: "false",
      message: "O nome é necessário"
    });
  } else if (!req.body.cadastradoAula) {
    return res.status(400).send({
      success: "false",
      message: "O cadastro na aula é necessário"
    });
  } else if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O registro é necessário"
    });
  }
  if(req.body.idNFC != ''){
    var identNFC = req.body.idNFC;
  }
  else {
    identNFC = '';
  }

  const person = {
    nomePessoa: req.body.nomePessoa,
    registro: req.body.registro,
    cadastradoAula: req.body.cadastradoAula,
    identNFC
  };
  Students.create(person);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Criada com Sucesso",
    person
  });
};

handlers.delete = async (req, res) => {
  if (!req.body.nomePessoa) {
    return res.status(400).send({
      success: "false",
      message: "O nome é necessário"
    });
  } else if (!req.body.cadastradoAula) {
    return res.status(400).send({
      success: "false",
      message: "O cadastro na aula é necessário"
    });
  } else if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O registro é necessário"
    });
  }
  const person = {
    nomePessoa: req.body.nomePessoa,
    registro: req.body.registro,
    cadastradoAula: req.body.cadastradoAula,
    idNFC: req.body.idNFC
  };
  Students.deleteOne(person);
  return res.status(201).send({
    success: "true",
    message: "Pessoa excluida com Sucesso",
    person
  });
};

module.exports = handlers;
