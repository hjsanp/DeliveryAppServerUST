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
    console.log('LOGIN', req.body)
    if (!phoneNumber || !password) return next(new ErrorResponse('Provide an email and a password', 400))


    try {
        const restaurant = await Restaurant.findOne({ phoneNumber }).select('+password')

        if (!restaurant) return next(new ErrorResponse('Invalid phone number and password.', 401))
        console.log('After phonenum')
        const isMatched = await restaurant.matchPasswords(password)

        if (!isMatched) return next(new ErrorResponse('Invalid phone number and password.', 401))
        const info = {
            phoneNumber, 
            id: restaurant._id, 
            address: restaurant.address, 
            name: restaurant.baseModelName, 
            img: restaurant.img,
        }
        res.status(200).json(info)
    } catch (err) {
        next(err)
    }
}

// add Food
exports.addFood = async (req, res, next) => {
    const { price, desc, name, restaurantId } = req.body
    const { path } = req.file

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId)
        console.log(foundRestaurant)
        const newFood = {
            name, desc, price,
            img: path
        }
        foundRestaurant.foods.push(newFood)
        const modRestaurant = await foundRestaurant.save()
        res.status(201).json(modRestaurant.foods)
    } catch (err) {
        next(err)
    }
}

