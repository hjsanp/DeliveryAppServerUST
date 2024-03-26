const express = require('express')
const router = express.Router()
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { login, register, addFood, addAddOn, getFoodInfo, getMenu } = require('../controllers/restaurants')

router.route('/register').post(upload.single('image'), register)

router.route('/login').post(login)

router.route('/addFood').post(upload.single('image'), addFood)

router.route('/addAddOn').post(upload.single('image'), addAddOn)

router.route('/getFoodInfo').post(getFoodInfo) 

router.route('/getMenu').post(getMenu) 

module.exports = router 