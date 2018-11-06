var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var UserController = require('../../controllers/users.controller');


// Map each API to the Controller FUnctions

router.get('/', UserController.getUsers)

router.post('/', UserController.createUser)

router.put('/', UserController.updateUser)

router.delete('/:id',UserController.removeUser)

router.get('/user/:id', UserController.getUserById);

// Export the Router

module.exports = router;