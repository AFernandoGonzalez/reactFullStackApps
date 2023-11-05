const express = require('express');
const router = express.Router();
const { list, create, read, update, remove, userById } = require('../controllers/user.controller');
const { requireSignin, hasAuthorization } = require('../controllers/auth.controller');

router.route('/api/users')
    .get(list)
    .post(create);

router.route('/api/users/:userId')
    .get( requireSignin ,read)
    .put(requireSignin, hasAuthorization, update)
    .delete(requireSignin, hasAuthorization, remove);

router.param('userId', userById);

module.exports = router;