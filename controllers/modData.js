const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const { ObjectId } = require('mongodb');



exports.addAddress = async (req, res, next) => {
    let { name, address, userId } = req.body
    try {
        const user = await User.findById(userId)
        if (name.length === 0 || !name.length) {
            let len = user.addresses.length
            if (len == 0) len = ''
            name = 'Address ' + len
        }
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

exports.toggleFavorite = async (req, res, next) => {
    let { userId, favorite } = req.body
    try {
        const user = await User.findById(userId)
        const favoriteId = String(favorite.id)
        if (user.favorites.get(favoriteId)) favorite = false
        user.favorites.set(favoriteId, favorite)
        const updatedUser = await user.save()
        res.status(200).json(updatedUser.favorites)
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
exports.editAddress = async (req, res, next) => {
    const { userId, address } = req.body
    try {

        const user = await User.findById(userId)
        const tmp = [...user.addresses]
        let idx = 0;
        for (let i = 0; i < tmp.length; i++) {
            console.log(tmp[i]._id.toString() === address._id)
            if (tmp[i]._id.toString() === address._id) {
                idx = i
                break
            }
        }
        const key1 = 'addresses.' + idx + '.name'
        const key2 = 'addresses.' + idx + '.address'
        const updatedUser = await User.updateOne({ _id: userId },
            {
                $set: {
                    [key1]: address.name,
                    [key2]: address.address
                }
            })
        const user2 = await User.findById(userId)
        console.log(key1, key2, user2.addresses)
        res.status(200).json(user2.addresses)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
exports.deleteAddress = async (req, res, next) => {
    const { userId, address } = req.body
    try {
        const updatedUser = await User.updateOne({ _id: userId }, {
            $pull: { addresses: { _id: address._id } }
        })
        const user = await User.findById(userId)
        res.status(200).json(user.addresses)
    } catch (err) {
        next(err)
        console.log(err)
    }
}


