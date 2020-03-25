const handlers = {};
const Person = require("./personModel/person");

handlers.get = async (req, res) => {
  if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O Registro é necessário"
    });
  }
  const personToFind = {
    registro : req.body.registro
  }
  const foundPerson = Person.find(personToFind, (err, docs) => {
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
  else if (!req.body.idNFC) {
    return res.status(400).send({
      success: "false",
      message: "A Tag NFC é necessário"
    });
  }

  const newPerson = {
    nomePessoa: req.body.nomePessoa,
    registro: req.body.registro,
    cadastradoAula: req.body.cadastradoAula,
    idNFC: req.body.idNFC
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
  }
  const personToUpdate = {
    registro: req.body.registro,
    nomePessoa: req.body.nomePessoa,
    cadastradoAula : req.body.cadastradoAula,
    idNFC : req.body.idNFC
  }
  await Person.updateOne(personToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Atualizada com Sucesso",
    personToUpdate
  });
};

handlers.delete = async (req, res) => {
  if (!req.body.registro) {
    return res.status(400).send({
      success: "false",
      message: "O registro é necessário"
    });
  }
  const personToDelete = {
    registro: req.body.registro,
  };
  Person.deleteOne(personToDelete);
  return res.status(201).send({
    success: "true",
    message: "Pessoa excluida com Sucesso",
    personToDelete
  });
};

module.exports = handlers;