const express = require('express');
const router = express.Router();
const { signin, signout } = require('../controllers/auth.controller');

router.route('/auth/signin', signin)
    .post(signin);
router.route('/auth/signout')
    .get(signout);

module.exports = router;