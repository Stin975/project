const express = require('express');
const router = express.Router();
const controller = require('../controllers/connectionController');

router.get('/', controller.index);

router.get('/new', controller.new);

router.get('/:id', controller.show);

router.delete('/:id', controller.delete);

router.post('/', controller.create);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

module.exports = router;