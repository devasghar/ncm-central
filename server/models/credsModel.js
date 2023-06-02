const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const credsSchema = new Schema({
    id: ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Cred', credsSchema);