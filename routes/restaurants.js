const express = require('express')
const router = express.Router()
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { login, register, addFood } = require('../controllers/restaurants')

router.route('/register').post(upload.single('image'), register)

router.route('/login').post(login)

router.route('/addFood').post(upload.single('image'), addFood)


module.exports = router 