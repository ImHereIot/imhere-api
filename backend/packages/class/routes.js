const express = require('express');
const router = express.Router();
const handlers = require('./handlers')


router.get('/:registro', handlers.get);
//router.get('/:idAula', handlers.get);
router.post('/', handlers.post);
router.put('/:idAula', handlers.put);
router.delete('/delete/:idAula', handlers.delete);

module.exports = router;
