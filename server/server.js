const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const credsRoutes = require('./routes/creds')
const clientsRoutes = require('./routes/clients')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const visitorsRoutes = require('./routes/visitors')
const authMiddleware = require('./middleware/auth');

app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.method + ' ' + req.path + '' + JSON.stringify(req.body));
    next()
})

app.use('/api', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/creds', authMiddleware, credsRoutes)
app.use('/api/clients', authMiddleware, clientsRoutes)
app.use('/api/visitors', authMiddleware, visitorsRoutes)

mongoose.set("strictQuery", false)
process.env.MONGO_URI && (
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`Connected to database and listening on port ${process.env.PORT}`)
            })
        })
        .catch((error) => {
            console.log(error);
        })
)