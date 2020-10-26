var express = require('express');
const heroesController = require('../controllers/heroesController');
var router = express.Router();


router.get('/', heroesController.list)


router.get('/create', heroesController.create)

router.get('/search', heroesController.search)
router.get('/:id', heroesController.show)

router.get('/:id/edit', heroesController.edit)
router.put('/:id/refresh', heroesController.refresh)
router.post('/create',heroesController.save)
router.delete('/:id/delete', heroesController.delete)










module.exports = router;