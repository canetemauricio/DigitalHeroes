var express = require('express');
const heroesController = require('../controllers/heroesController');
var router = express.Router();


router.get('/', heroesController.list)
router.get('/search', heroesController.search)
router.get('/:id', heroesController.show)
router.get('/:id/resenia/:tipo?', heroesController.review)





module.exports = router;