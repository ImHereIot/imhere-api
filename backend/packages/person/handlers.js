const handlers = {};
const Person = require("./personModel/person");

handlers.get = async (req, res) => {
  if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O Registro é necessário"
    });
  }
  const foundPerson = Person.findOne(req.body.registro, (err, docs) => {
    if (err) {
      return err;
    }
    return docs;
  });
  if (foundPerson != "") {
    return res.status(201).send({
      success: "true",
      registro
    });
  }
  return res.status(204).send({
    success: "false",
    message: "Nenhum registro foi encontrado"
  });
};

handlers.post = async (req, res) => {
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
  else if (!req.body.identNFC) {
    return res.status(400).send({
      success: "false",
      message: "A Tag NFC é necessário"
    });
  }

  const newPerson = {
    nomePessoa: req.body.nomePessoa,
    registro: req.body.registro,
    cadastradoAula: req.body.cadastradoAula,
    idNFC: req.body.identNFC
  };
  Person.create(newPerson);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Criada com Sucesso",
    newPerson
  });
};

handlers.put = async (req, res) => {
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
  if (req.body.idNFC != "") {
    var identNFC = req.body.idNFC;
  } else {
    identNFC = "";
  }
  Person.updateOne(req.body.registro);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Criada com Sucesso",
    newPerson
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
  Person.deleteOne(person);
  return res.status(201).send({
    success: "true",
    message: "Pessoa excluida com Sucesso",
    person
  });
};

module.exports = handlers;
