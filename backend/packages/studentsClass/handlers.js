const handlers = {};
const StudentClass = require("./studentClassModel/studentClassModel");
const Person = require("../person/personModel/person");
const Class = require('../class/classModel/class');
const moment = require('moment');
const momentTMZ = require('moment-timezone');

handlers.get = async (req, res) => {
  var requisicao = req.params.idAula;
  var resultSplit = requisicao.split('|');

  var idAula = resultSplit[0];
  idAula.toString();

  var idPessoa = resultSplit[1];
  idPessoa = parseInt(idPessoa);



  //trazer dados de alunos cadastrados em uma aula

  studentClass.find({ idAula: idAula, idPessoa: idPessoa }, (err, docs) => {
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
  const  idAula  = req.params.idAula;
  const getDate = new Date();

  const timezone = 'America/Sao_Paulo';

  function toTimeZone(time, zone) {
    return momentTMZ(time).tz(zone).toDate();
  }
  async function achaAula(idAula) {
    const returnedClass = await Class.findOne({ idAula: idAula }, (err, docs) => {
      if(docs) {
        const actualHour = toTimeZone(getDate, timezone);
        const updatedHour = moment(actualHour).subtract(3, 'h').toDate();

        const ch = new Date(docs.horario);
        const classHour = moment(ch).add(21,'m').toDate();
        var i = 0;

        StudentClass.find({ idAula: idAula },  (err, docs)  => {
          docs.forEach(register => {
            if(updatedHour > classHour) {
              StudentClass.findOneAndUpdate({ idAula: register.idAula, presenca: 1}, { presenca: 3 }, (retorno) => {
                  console.log('atualizou');
              });
            }
          });
        })
      }
    })
  }

  StudentClass.find({ idAula: idAula }, (err, docs) => {
    achaAula(idAula);
    if (err) {
      return res.status(201).send({
        success: "false",
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
  const dateAula = new Date();
  const newStudentsClass = {
    idAula: req.body.idAula,
    idPessoa: req.body.idPessoa,
    nomePessoa: req.body.nomePessoa,
    data: dateAula,
    presenca: 1,
  };
  studentClass.create(newStudentsClass);
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
    presenca: req.body.presenca,
  }
  await StudentClass.findOneAndUpdate({ idAula: idAula, idPessoa: idPessoa }, studentsClassToUpdate);
  return res.status(201).send({
    success: "true",
    message: "Pessoa Atualizada com Sucesso",
    studentsClassToUpdate
  });
};

handlers.putIot = async (req, res) => {
  const idNFC = req.params.idNFC;

  async function buscaPerson() {
    const returnedPerson = await Person.findOne({ idNFC: idNFC })
    return returnedPerson;

  };
  const personSearch = await buscaPerson();

  const today = moment().startOf('day');
  async function buscaClass() {
    const returnedClass = await Class.find({
      horario: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    })
    return returnedClass;
  };

  async function filtraAulaAluno(aulas) {
    var retorno = [];
    aulas.forEach(element => {
      if (element.alunosCadastrados.includes(personSearch.registro)) {
        retorno.push(element);
      }
    });
    return retorno;
  }
  const returnedClass = await buscaClass();
  console.log(returnedClass);
  const returnedFilteredClasses = await filtraAulaAluno(returnedClass);
  console.log(returnedFilteredClasses);

  function buscaAulaAlunoHoras(obj) {
    var aulasDoAluno = [];
    for (let index = 0; index < obj.length; index++) {
      aulasDoAluno.push(obj[index]);
    }
    console.log(aulasDoAluno, 'aaa');

    return aulasDoAluno;
  }

  var returnedData = '';
  if (returnedFilteredClasses !== '' && returnedFilteredClasses !== null && returnedFilteredClasses !== undefined) {
    returnedData = buscaAulaAlunoHoras(returnedFilteredClasses);
  } else {
    return res.status(201).send({
      success: "true",
      message: "Não há aula hoje para você",
    });
  }

  async function compareHour() {
    const getDate = new Date();

    const timezone = 'America/Sao_Paulo';

    function toTimeZone(time, zone) {
      return momentTMZ(time).tz(zone).toDate();
    }

    const actualHour = toTimeZone(getDate, timezone);
    var timeToCompare = moment(actualHour).toDate();
    var updated = 1;

    //puxa hora atual para verificar
    returnedData.forEach( async returnedData => {
      var ch = new Date(returnedData.horario);
      var aula = returnedData.idAula
      var hourToSend = ch; 
      var classHour = moment(ch).add(3,'h').toDate();
      
      //retira 20 minutos na hora atual para verificar se ele vai ter falta 
      var aheadHour = moment(timeToCompare).subtract(20, 'm').toDate();
      //insere 20 minutos na hora atual para verificar se ele vai ter aula
      var lateHour = moment(timeToCompare).add(20, 'm').toDate();


      if (classHour < aheadHour || classHour > lateHour) {
        return;
      } else {

        updated = 2
        const updatedStudentClass = {
          presenca: 2,
          data: hourToSend
        }
        await StudentClass.findOneAndUpdate({ idPessoa: personSearch.registro, idAula: aula }, updatedStudentClass);
        return res.status(201).send({
          success: "true",
          message: "Aula Marcada",
          updatedStudentClass
        });
      }
    }); 
    if(updated == 1) {
      return res.status(201).send({
        success: "true",
        message: "não foi encontrada aula neste horário",
      });
    }
  }
  //whilse (returnedData.length) {
  //await compareHour();
  //}
  await compareHour();
};

handlers.delete = async (req, res) => {
  const { idAula } = req.params;

  var deletedStudentClass = StudentClass.findOneAndDelete({ idAula: idAula });
  return res.status(201).send({
    success: "true",
    deletedStudentClass
  });
};


module.exports = handlers;