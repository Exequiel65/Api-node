const express = require('express');
const router = express.Router();
const index = require('../controllers/index.controller')


router.get('/', index.index )


module.exports = router