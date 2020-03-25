const express = require('express');
const router = express.Router();
const handlers = require('./handlers')


router.get('/', handlers.get);
router.post('/', handlers.post);
router.put('/', handlers.put);
router.delete('/delete', handlers.delete);

module.exports = router;
