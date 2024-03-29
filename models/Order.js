const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliverTo: {
        addressId: mongoose.Schema.Types.ObjectId,
        address: String
    },
    dateOrdered: Date,
    arrivalTime: Date,
    deliveryFee: Number,
    totalAddOnsAmount: Number,
    finalPrice: Number,
    discountedPrice: Number,
    img: String,
    restaurantName: String,
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
    paymentOption: {
        type: Map,
        of: {},
        default: {}
    },

})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order