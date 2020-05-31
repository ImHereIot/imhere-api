const express = require('express');
const router = express.Router();
const handlers = require('./handlers')


//router.get('/:registro', handlers.get);
router.get('/:idAula', handlers.getOne);
router.get('/:idAula', handlers.getStudents);
router.post('/', handlers.post);
router.put('/:idAula', handlers.put);
router.delete('/delete/:idAula', handlers.delete);

module.exports = router;
