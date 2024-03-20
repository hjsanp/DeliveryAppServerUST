const Restaurant = require('../models/Restaurant')
const ErrorResponse = require('../utils/errorResponse')



exports.register = async (req, res, next) => {
    const { password, phoneNumber, address, name } = req.body
    const { path } = req.file

    try {
        const newRestaurant = await Restaurant.create({...req.body, img: path})
        console.log(newRestaurant, address)
        const info = {
            phoneNumber, address, name, id: newRestaurant._id, img: path
        }
        res.status(201).json({info})
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body

    if (!phoneNumber || !password) return next(new ErrorResponse('Provide an email and a password', 400))


    try {
        const restaurant = await Restaurant.findOne({ phoneNumber }).select('+password')

        if (!restaurant) return next(new ErrorResponse('Invalid phone number and password.', 401))

        const isMatched = await restaurant.matchPasswords(password)

        if (!isMatched) return next(new ErrorResponse('Invalid phone number and password.', 401))
        const info = {
            phoneNumber, 
            id: restaurant._id, 
            address: restaurant.address, 
            name: restaurant.baseModelName, 
            img: restaurant.img,
        }
        res.status(200).json({info})
    } catch (err) {
        next(err)
    }
}

// add Food


