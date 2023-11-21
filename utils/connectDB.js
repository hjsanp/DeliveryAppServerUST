const mongoose = require('mongoose')
const dbUri = process.env.MONGODB_CONNECTION

const connectDB = async () => {
    await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('MongoDB Connected!')
}

module.exports = connectDB