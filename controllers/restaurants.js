const Restaurant = require('../models/Restaurant')
const ErrorResponse = require('../utils/errorResponse')
const mongoose = require('mongoose')


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
            img: path
        }
        if(foundRestaurant.foods?.length) foundRestaurant.foods.push(newFood)
        else foundRestaurant.foods = [newFood]
        const modRestaurant = await foundRestaurant.save()
        res.status(201).json(modRestaurant.foods)
    } catch (err) {
        next(err)
    }
}
exports.deleteFood = async (req, res, next) => {
    const { restaurantId, foodId } = req.body
    
    try {
        const deletedFood = await Restaurant.updateOne({_id: restaurantId}, {$pull: {'foods._id': foodId}})
        const restaurant = await Restaurant.findById(restaurantId)
        res.status(201).json(restaurant.foods)
    } catch (err) {
        next(err)
    }
}


exports.addAddOn = async (req, res, next) => {
    const { price, name, restaurantId, foodId } = req.body
    const { path } = req.file

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId)
        console.log(foundRestaurant)
        const newAddOn = {
            name, price,
            img: path
        }
        foundRestaurant.foods.forEach(food => {
            if(food._id == foodId) {
                console.log("Food Id match")
                food.addOns.push(newAddOn)
            }
        })
        const modRestaurant = await foundRestaurant.save()
        res.status(201).json(modRestaurant.foods)
    } catch (err) {
        next(err)
    }
}
exports.deleteAddOn = async (req, res, next) => {
    const {restaurantId, foodId, addOnId } = req.body

    try {
        
        
        const updatedRestaurant = await Restaurant.updateOne(
            {_id: restaurantId, foods: {_id: foodId}}, 
            {$pull: {'foods.$.addOns': {_id: addOnId}}})
            const restaurant = await Restaurant.findById(restaurantId)
            console.log('UPDATED RESTAURANT', restaurant)
        res.status(201).json(restaurant.foods)
    } catch (err) {
        next(err)
    }
}

exports.getMenu = async (req, res, next) => {
    const { restaurantId } = req.body

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId)
        res.status(200).json(foundRestaurant.foods)
    } catch (err) {
        next(err)
    }
}

exports.getFoodInfo = async (req, res, next) => {
    const { restaurantId, foodId } = req.body

    try {
        const foundRestaurant = await Restaurant.findById(restaurantId)
        let foundFood;
        foundRestaurant.foods.forEach(food => {
            console.log(typeof food._id, food._id, typeof foodId, foodId)
            if(food._id == foodId) {
                console.log("Food found")
                foundFood = food 
            }
        })

        res.status(200).json(foundFood)
    } catch (err) {
        next(err)
    }
}



