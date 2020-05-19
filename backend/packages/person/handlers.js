const handlers = {};
const Person = require("./personModel/person");

handlers.get = async (req, res) => {
  Person.find({}, (err, docs) => {
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

handlers.authenticate = async (req, res) => {
  const registro = req.body.registro;
  const password = req.body.password;
  
  const user = await Person.findOne({ 
    registro: registro,
    password: password,
  });


  if(!!user) {
    return res.status(201).send ({
      ...user.toJSON(),
    });
  }
  return res.status(401).send ({
    success: "False",
    message: "Senha ou usuario incorreto",
  });
}

handlers.post = async (req, res) => {

  const body = req.body;  

  const newPerson = {
    nomePessoa: body.nomePessoa,
    registro: body.registro,
    idNFC: body.idNFC,
    tipoPessoa : body.tipoPessoa,
    password : body.password,
    email : body.email
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
    email : req.body.email,
    idNFC : req.body.idNFC
  };

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