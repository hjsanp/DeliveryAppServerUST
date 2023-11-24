require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
const connectMongoDB = require('./utils/connectDB')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

connectMongoDB()

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }));

app.use(cors())

app.get('/', (req, res) => {
    res.send('Food Delivery API is running.')
})


app.use('/foodDelivery/api/auth', require('./routes/authenticate'))
app.use('/foodDelivery/api/data', require('./routes/modData'))

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))