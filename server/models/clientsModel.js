const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const clientsSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Client', clientsSchema);