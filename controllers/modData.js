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

        const tmp = user.addresses
        let idx = 0;
        for (let i = 0; i < tmp.length; i++) {
            if (tmp._id == address._id) {
                idx = 0;
                break
            }
        }

        const updatedUser = await User.updateOne({ _id: userId },
            {
                $set: {
                    [`addressses.${idx}.name`]: address.name,
                    [`addressses.${idx}.address`]: address.address,
                }
            })
        res.status(200).json(updatedUser.addresses)
    } catch (err) {
        next(err)
        console.log(err)
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


