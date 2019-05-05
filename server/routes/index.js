const router = require('express').Router()
const UserController = require('../controllers/userController')
const TodoController = require('../controllers/todoController')
const isAunthenticate = require('../middlewares/Aunthentication')
const isAuthorize = require('../middlewares/Authorization')
router.get('/', isAunthenticate, TodoController.read)
router.post('/', isAunthenticate, TodoController.create)
router.patch('/:id', isAunthenticate, isAunthenticate, TodoController.update)
router.delete('/:id', isAunthenticate, isAuthorize, TodoController.delete)
router.post('/gSign', UserController.gSsign)
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)

module.exports = router