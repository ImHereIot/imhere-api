const Class = require("./classModel/class");
const Crew = require("../crew/crewModel/crew");
const studentClass = require("../studentsClass/studentClassModel/studentClassModel");
const crypto = require('crypto');
const handlers = {};


handlers.get = async (req, res) => {
  const { registro } = req.params;

  Class.find({}, (err, docs) => {
    if (err) {
      return res.status(201).send({
        success: "false",
        err
      });
    };

    function filtraAulaAluno(aulas) {
      var retorno = [];
      aulas.forEach((busca) => {
        if (busca.alunosCadastrados.includes(registro)) {
          retorno.push(busca);
        }
      });
      return retorno;
    }

    const retornoAula = filtraAulaAluno(docs);

    return res.status(201).send({
      success: "true",
      retornoAula
    });
  });
};

handlers.getOne = async (req, res) => {
  const { idAula } = req.params;

  Class.find({ idAula: idAula }, (err, docs) => {
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
  try {
    const idTurma = req.body.idTurma;

    if (!req.body.professor) {
      return res.status(400).send({
        success: "false",
        message: "O professor é necessário"
      });
    }
    if (!req.body.idTurma) {
      return res.status(400).send({
        success: "false",
        message: "O idTurma é necessário"
      });
    }

    function buscaCrew(idToSearch) {
      const search = idToSearch
      Crew.findOne({ idTurma: search }, (err, docs) => {
      }).then((docs) => {
        console.log(docs.alunos);
        const newClass = {
          idAula: crypto.randomBytes(20).toString('HEX'),
          professor: req.body.professor,
          idProfessor: req.body.idProfessor,
          alunosCadastrados: docs.alunos,
          idTurma: req.body.idTurma,
          sala: req.body.sala,
          unidade: req.body.unidade,
          data: req.body.data,
          horario: req.body.horario,
          detalhe: req.body.detalhe,
          nomeAula: req.body.nomeAula,
        };
        newClass.alunosCadastrados.push(req.body.idProfessor);
        Class.create(newClass);
        return res.status(201).send({
          success: "true",
          message: "Aula Criada com Sucesso",
          newClass
        });
      })
    }
    buscaCrew(idTurma);
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
};

handlers.put = async (req, res) => {
  if (!req.params) {
    return res.status(400).send({
      success: "false",
      message: "O id da Aula é necessário"
    });
  }

  const { idAula } = req.params;

  const classToUpdate = {
    sala: req.body.sala,
    data: req.body.data,
    unidade: req.body.unidade,
    horario: req.body.horario,
    detalhe: req.body.detalhe,
  }
  await Class.findOneAndUpdate({ idAula: idAula }, classToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Aula atualizada com Sucesso",
    classToUpdate
  });
};

handlers.delete = async (req, res) => {
  const { idAula } = req.params;

  var deletedClass = await Class.findOneAndDelete({ idAula: idAula });
  return res.status(201).send({
    success: "true",
    message: "Aula excluida com Sucesso",
    deletedClass
  });
};

module.exports = handlers;
