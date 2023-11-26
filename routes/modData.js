const express = require('express')
const router = express.Router()

const { addAddress, getAddresses, getOrders, submitOrder, addFavorite, } = require('../controllers/modData')

router.route('/addAddress').post(addAddress)
router.route('/getAddresses').post(getAddresses)

router.route('/getOrders').post(getOrders)
router.route('/submitOrder').post(submitOrder)

router.route('/addFavorite').post(addFavorite)
router.route('/getFavorites').post(getFavorites)


module.exports = router 