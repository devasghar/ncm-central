const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const visitorsSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Visitor', visitorsSchema);