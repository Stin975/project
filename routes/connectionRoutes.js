const express = require('express');
const router = express.Router();
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor, isNotAuthor} = require('../middlewares/auth')
const {validateId, validateRsvp, validateResults} = require('../middlewares/validator')

router.get('/', controller.index);

router.get('/new',isLoggedIn, controller.new);

router.get('/:id', validateId, controller.show);

router.delete('/:id', isLoggedIn, validateId, isAuthor, controller.delete);

router.post('/', isLoggedIn, controller.create);

router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, validateId, isAuthor, controller.update);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotAuthor, validateRsvp, validateResults, controller.editRsvp);

router.delete('/:id/rsvp', validateId, isLoggedIn, controller.deleteRsvp);

module.exports = router;