const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/', handlers.list);
router.put('/', handlers.put);
router.post('/', handlers.create);
router.delete('/delete', handlers.delete);

module.exports = router;
