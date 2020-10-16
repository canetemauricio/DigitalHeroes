var express = require('express');
const mainController = require('../controllers/mainController');
var router = express.Router();

router.get('', mainController.home)
router.get('/creditos', mainController.about)





module.exports = router;