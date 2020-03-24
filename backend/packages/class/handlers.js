const Class = require("./classModel/class");
const handlers = {};

handlers.list = async (req, res) => {
  res.status(200).send(console.log("aaaaaaaa"));
};

handlers.create = async (req, res) => {
  if (!req.body.nomePessoa) {
    return res.status(400).send({
      success: "false",
      message: "O nome é necessário"
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
  Class.create(person);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Criada com Sucesso",
    person
  });
};

handlers.cancel = async (req, res) => {
  console.log("caiu no cancel");
};

module.exports = handlers;
