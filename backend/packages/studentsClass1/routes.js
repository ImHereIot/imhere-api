const express = require('express');
const router = express.Router();
const handlers = require('../studentsClass/handlers');

router.get('/:idAula', handlers.getStudents);

module.exports = router;
