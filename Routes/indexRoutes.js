const indexController = require('../Controllers/indexController');
const express = require('express');
const router = express.Router();

router.get('/', indexController.index);

module.exports = router;