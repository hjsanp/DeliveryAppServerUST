const mongoose = require('mongoose')
const dbUri = process.env.MONGODB_CONNECTION

const connectDB = async () => {
    await mongoose.connect(dbUri)

    console.log('MongoDB Connected!')
}

module.exports = connectDB