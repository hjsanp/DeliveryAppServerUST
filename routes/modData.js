const express = require('express')
const router = express.Router()

const { addAddress, getAddresses, getOrders, submitOrder } = require('../controllers/modData')

router.route('/addAddress').post(addAddress)

router.route('/getAddresses').post(getAddresses)

router.route('/getOrders').post(getOrders)

router.route('/submitOrder').post(submitOrder)


module.exports = router 