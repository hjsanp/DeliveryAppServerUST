const express = require('express')
const router = express.Router()
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { login, register, addFood, addAddOn, getFoodInfo, getMenu, deleteAddOn, deleteFood } = require('../controllers/restaurants')

router.route('/login').post(login)
router.route('/register').post(upload.single('image'), register)

router.route('/addFood').post(upload.single('image'), addFood)
router.route('/addAddOn').post(upload.single('image'), addAddOn)

router.route('/getFoodInfo').post(getFoodInfo) 
router.route('/getMenu').post(getMenu) 

router.route('/deleteAddOn').post(deleteAddOn) 
router.route('/deleteFood').post(deleteFood) 

module.exports = router 