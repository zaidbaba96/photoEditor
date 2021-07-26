//const express = require('express')

const router = require("express").Router();
const authController = require('../controller/auth.controller')
//const userController = require('../controllers/user.controller')
const passport = require('passport')

// auth
require('../middleware/auth')
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;