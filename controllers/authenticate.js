const cloudinary = require('cloudinary').v2;
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


cloudinary.config({
    cloud_name: 'djzmhyqre',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.register = async (req, res, next) => {
    const { password, firstName, lastName, phoneNumber, imageURI, age } = req.body
    try {
        const userImage = await cloudinary.uploader.upload(imageURI, { folder: 'Navsafe' })
        const isSenior = age >= 60
        const user = await User.create({ password, firstName, lastName, phoneNumber, age, userImage: userImage.url, isSenior })
        console.log(`User ${firstName} is registered!`)
        res.status(201).json({ userId: user._id, phoneNumber, firstName, lastName, userImage: userImage.url, age, isSenior })

    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body

    if (!phoneNumber || !password) return next(new ErrorResponse('Provide an email and a password', 400))


    try {
        const user = await User.findOne({ phoneNumber }).select('+password')

        if (!user) return next(new ErrorResponse('Invalid credentials', 401))

        const isMatched = await user.matchPasswords(password)

        if (!isMatched) return next(new ErrorResponse('Invalid credentials', 401))

        let profile = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            userImage: user.userImage,
            age: user.age,
            isSenior: user.isSenior
        }

        console.log(`User ${profile.firstName} is logged in!`)
        res.status(200).json(profile)
    } catch (err) {
        next(err)
    }
}