const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')




exports.register = async (req, res, next) => {
    // const { password, firstName, lastName, phoneNumber, imageURI, age } = req.body
    try {
        console.log('file', req.files);
        console.log('body', req.body);
        res.json({files: {...req.files}, body: {...req.body}})
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body

    if (!phoneNumber || !password) return next(new ErrorResponse('Provide an email and a password', 400))


    try {
       
    } catch (err) {
        next(err)
    }
}