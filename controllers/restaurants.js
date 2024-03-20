const Restaurant = require('../models/Restaurant')
const ErrorResponse = require('../utils/errorResponse')



exports.register = async (req, res, next) => {
    const { password, phoneNumber, address, name } = req.body
    const { path } = req.file

    try {
        console.log('file', req.file);
        console.log('body', req.body);
        res.json({file: {...req.file}, body: {...req.body}})
        const newRestaurant = await Restaurant.create({...req.body, path})
        res.status(201).json({...newRestaurant, id: newRestaurant._id})
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
        
        res.status(200).json({...restaurant, id: restaurant._id})
    } catch (err) {
        next(err)
    }
}

// add Food


