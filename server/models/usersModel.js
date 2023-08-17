const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const usersSchema = new Schema({
    id: ObjectId,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('User', usersSchema);