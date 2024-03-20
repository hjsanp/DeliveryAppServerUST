const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide a restaurant name']
    },
    phoneNumber: {
        type: Number,
        reqired: [true, 'Provide a mobile number.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Provide a password'],
        minlength: 6,
        select: false
    },
    img: {
        type: String,
        required: [true, 'Provide a restaurant photo']
    },
    address:{
        type: String,
        required: [true, 'Provide the restaurant address']
    },
    foods: [
        {
            name: String,
            desc: String,
            img: String,
            price: Number,
            addOns: []
        }
    ]

})

RestaurantSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(12) 
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

RestaurantSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(this.password, password)
}


const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant