const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliverTo: String,
    dateOrdered: String,
    arrivalTime: String,
    deliveryFee: Number,
    totalAddOnsAmount: Number,
    finalPrice: Number,
    discountedPrice: Number,
    cart: {
        type: Map,
        of: {},
        default: {}
    },
    addOns: {
        type: Map,
        of: {},
        default: {}
    },

})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order