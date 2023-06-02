require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const credsRoutes = require('./routes/creds')

app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.method + ' ' + req.path + '' + JSON.stringify(req.body));
    next()
})

app.use('/api/creds', credsRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })