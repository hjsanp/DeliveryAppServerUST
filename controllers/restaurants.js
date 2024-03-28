const Restaurant = require('../models/Restaurant')
const Food = require('../models/Food')
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
            name: restaurant.name, 
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
            restaurantId,
            img: path,
        }
        const createFood = await Food.create(newFood)
        foundRestaurant.foods.push(createFood._id)
        await foundRestaurant.save()
        const modRestaurant = await Restaurant.findById(restaurantId).populate('foods')
        res.status(201).json(modRestaurant.foods)
    } catch (err) {
        next(err)
    }
}
exports.deleteFood = async (req, res, next) => {
    const { restaurantId, foodId } = req.body
    
    try {
        const deletedRestaurantFood = await Restaurant.updateOne({_id: restaurantId}, {$pull: {foods: {$in: [foodId] }}})
        const deleteFood = await Food.findByIdAndDelete(foodId)
        const restaurant = await Restaurant.findById(restaurantId).populate('foods')
        res.status(200).json(restaurant.foods)
    } catch (err) {
        next(err)
    }
}


exports.addAddOn = async (req, res, next) => {
    const { price, name, restaurantId, foodId } = req.body
    const { path } = req.file

    try {
        const food = await Food.findById(foodId)
        const newAddOn = {
            name, price,
            img: path
        }
        food.addOns.push(newAddOn)
        await food.save()
        const foundRestaurant = await Restaurant.findById(restaurantId).populate('foods')
        res.status(201).json(foundRestaurant.foods)
    } catch (err) {
        next(err)
    }
}
exports.deleteAddOn = async (req, res, next) => {
    const {restaurantId, foodId, addOnId } = req.body

    try {
        const deleteAddOn = await Food.updateOne(
            {
                _id: foodId, 
            }, 
            {$pull: {addOns: {_id: addOnId}}})
        const restaurant = await Restaurant.findById(restaurantId).populate('foods')
        console.log('UPDATED RESTAURANT', restaurant)
        res.status(201).json(restaurant.foods)
    } catch (err) {
        next(err)
    }
}

exports.getMenu = async (req, res, next) => {
    const { restaurantId } = req.body

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId).populate('foods')
        res.status(200).json(foundRestaurant.foods)
    } catch (err) {
        next(err)
    }
}

exports.getFoodInfo = async (req, res, next) => {
    const { restaurantId, foodId } = req.body

    try {
        const foundFood = await Food.findById(foodId)
        res.status(200).json(foundFood)
    } catch (err) {
        next(err)
    }
}

exports.getRestaurantInfo = async (req, res, next) => {
    const { restaurantId } = req.body

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId).populate('foods')
        res.status(200).json(foundRestaurant)
    } catch (err) {
        next(err)
    }
}

exports.getRestaurants = async (req, res, next) => {

    try {
        const restaurants = await Restaurant.find().populate('foods')

        res.status(200).json(restaurants)
    } catch (err) {
        next(err)
    }
}



