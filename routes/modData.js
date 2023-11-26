const express = require('express')
const router = express.Router()

const { addAddress, getAddresses, getOrders, submitOrder, toggleFavorite, getFavorites } = require('../controllers/modData')

router.route('/addAddress').post(addAddress)
router.route('/getAddresses').post(getAddresses)

router.route('/getOrders').post(getOrders)
router.route('/submitOrder').post(submitOrder)

router.route('/toggleFavorite').post(toggleFavorite)
router.route('/getFavorites').post(getFavorites)


module.exports = router 