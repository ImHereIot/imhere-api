const express = require('express');
const router = express.Router();
const handlers = require('./handlers');


router.get('/', handlers.get);
router.put('/', handlers.put);
router.post('/', handlers.post);
router.delete('/delete', handlers.delete);

module.exports = router;
