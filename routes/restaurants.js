const express = require('express')
const router = express.Router()
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { login, register } = require('../controllers/authenticate')

router.route('/register').post(upload.single('image'), register)

router.route('/login').post(login)


module.exports = router 