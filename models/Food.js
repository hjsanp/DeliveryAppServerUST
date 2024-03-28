const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    price: Number,
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    addOns: [
        {
            name: String,
            img: String,
            price: Number
        }
    ]
})

const Food = mongoose.model('Food', FoodSchema)

module.exports = Food