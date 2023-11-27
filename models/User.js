const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last lame.']
    },
    phoneNumber: {
        type: Number,
        reqired: [true, 'Please provide your mobile number.'],
        unique: true
    },
    age: {
        type: Number,
        reqired: [true, 'Please provide your age.'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    userImage: {
        type: String,
        required: [true, 'Please provide a profile photo.']
    },
    addresses: [
        {
            name: String,
            address: String
        }
    ],
    isSenior: Boolean,
    favorites: {
        type: Map,
        of: {},
        default: {}
    },
    orders: []
    // {
    //     name: String,
    //     totalItems: Number,
    //     totalPrice: Number,
    //     dateOrdered: Date,
    //     dateDelivered: Date,
    //     deliverTo: {
    //         address: String,
    //         name: String
    //     },
    //     qty: {},
    //     items: []
    // }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User