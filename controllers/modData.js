const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')



exports.addAddress = async (req, res, next) => {
    const { name, address, userId } = req.body
    try {
        const user = await User.findById(userId)
        user.addresses.push({ name, address })
        const modUser = await user.save()
        res.status(200).json(modUser.addresses)
    } catch (err) {
        next(err)
        console.log(err)
    }
}

exports.getAddresses = async (req, res, next) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId)
        console.log(user.addresses)
        const addresses = user?.addresses
        res.status(200).json(addresses)
    } catch (err) {
        next(err)
        console.log(err)
    }
}
exports.submitOrder = async (req, res, next) => {
    const { order, userId } = req.body
    try {
        const user = await User.findById(userId)
        user.orders.push(order)
        const modUser = await user.save()
        res.status(200).json(modUser.orders)
    } catch (err) {
        next(err)
        console.log(err)
    }
}

exports.getOrders = async (req, res, next) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId)
        res.status(200).json(user.orders)
    } catch (err) {
        next(err)
        console.log(err)
    }
}

exports.addFavorite = async (req, res, next) => {
    const { userId, favorite } = req.body
    try {
        const user = await User.findById(userId)
        user.favorites.set(favorite.id, favorite)
        res.status(200).json(user.favorites)
    } catch (err) {
        next(err)
        console.log(err)
    }
}
exports.getFavorites = async (req, res, next) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId)
        res.status(200).json(user.favorites)
    } catch (err) {
        next(err)
        console.log(err)
    }
}
