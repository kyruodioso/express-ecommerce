var express = require('express');
var router = express.Router();

const usersController= require('../controllers/users.controller')

//se crea el usuario
router.post("/", usersController.create);
router.post("/auth", usersController.login)

module.exports = router;
