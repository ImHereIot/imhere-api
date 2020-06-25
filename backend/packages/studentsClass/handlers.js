const handlers = {};
const studentClass = require("./studentClassModel/studentClassModel");
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
    // nomePessoa: req.body.idAula,
    // idPessoa: req.body.idPessoa,
    // data: req.body.data,
    presenca: req.body.presenca,
  }
  await studentClass.findOneAndUpdate({ idAula: idAula }, studentsClassToUpdate);
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

  async function buscaClass() {
    const returnedClass = await Class.find({})
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
  const returnedFilteredClasses = await filtraAulaAluno(returnedClass);

  function buscaAulaAlunoHoras(obj) {
    var aulasDoAluno = [];
    for (let index = 0; index < obj.length; index++) {
      aulasDoAluno.push(obj[index].horario);
    }
    return aulasDoAluno;
  }

  if(returnedFilteredClasses !== '' && returnedFilteredClasses !== null && returnedFilteredClasses !== undefined ) {
    const returnedData = buscaAulaAlunoHoras(returnedFilteredClasses);
  }

  async function compareHour() {
    const getDate = new Date()

    const timezone = 'America/Sao_Paulo';

    function toTimeZone(time, zone) {
      var format = 'YYYY/MM/DD HH:mm:ss';
      return momentTMZ(time, format).tz(zone).format(format);
    }

    const actualHour = toTimeZone(getDate,timezone);
    console.log(actualHour);
    
    
    console.log(actualHour , 'actualHour');
    
    //puxa hora atual para verificar
    var d = new Date(returnedData[0]);
    console.log(d);
    const classHour = d.getHours() + ":" + d.getMinutes();
    //puxa hora atual para verificar

    console.log(classHour , 'classHour');

    
    //insere 20 minutos na hora atual para verificar se ele vai ter aula
    var aheadHour = moment(classHour).subtract(20, 'm').toDate();
    console.log(aheadHour);
    const aheadDate = aheadHour.getHours() + ":" + aheadHour.getMinutes();
    //insere 20 minutos na hora atual para verificar se ele vai ter aula

    console.log(aheadDate , 'aheadDate');

    //retira 20 minutos na hora atual para verificar se ele vai ter falta 
    var lateHour = moment(classHour).add(20, 'm').toDate();
    const lateDate = lateHour.getHours() + ":" + lateHour.getMinutes();
    console.log(lateHour);
    console.log(lateDate, 'lateDate');
    

    if (actualHour < aheadHour) {
      return res.status(201).send({
        success: "true",
        message: "Esta Aula ainda não começou",
      });
    }
    else if (actualHour > lateHour) {
      return res.status(201).send({
        success: "true",
        message: "Esta Aula ainda não começou",
      });
    }
    else {
      const updatedStudentClass = {
        presenca: 2
      }
      await studentClass.findOneAndUpdate({ idPessoa: personSearch.registro }, updatedStudentClass);

      return res.status(201).send({
        success: "true",
        message: "Aula Marcada",
        updatedStudentClass
      });

    }
  }
  //whilse (returnedData.length) {
  //await compareHour();
  //}
  if(returnedFilteredClasses !== '' && returnedFilteredClasses !== null && returnedFilteredClasses !== undefined ) {
    await compareHour();
  }
  else {
    return res.status(201).send({
      success: "true",
      message: "Este aluno nao esta nesta aula",
    });

  }
};

handlers.delete = async (req, res) => {
  const { idAula } = req.params;

  var deletedStudentClass = studentClass.findOneAndDelete({ idAula: idAula });
  return res.status(201).send({
    success: "true",
    deletedStudentClass
  });
};


module.exports = handlers;