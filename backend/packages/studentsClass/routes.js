const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/:idAula/', handlers.get);
router.put('/iot/:idNFC', handlers.putIot);
router.put('/:idAula', handlers.put);

router.post('/', handlers.post);
router.delete('/delete', handlers.delete);

module.exports = router;
