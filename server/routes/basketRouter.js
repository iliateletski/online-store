const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.add)
router.put('/update', basketController.update)
router.get('/', basketController.getBasket)
router.get('/getOne', basketController.getOne)
router.get('/:basketId', basketController.getAll)
router.delete('/', basketController.remove)

module.exports = router