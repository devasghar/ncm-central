const Visitor = require('../models/visitorsModel')
const mongoose = require('mongoose')

const createVisitor = async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.body

    let emptyFields = []
    if (!name) {
        emptyFields.push('name')
    }

    if (!email) {
        emptyFields.push('email')
    }

    if (!phone) {
        emptyFields.push('phone')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const visitor = await Visitor.create({
            name,
            email,
            phone,
        })
        res.status(200).json(visitor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVisitors = async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.query;

    const visitors = await Visitor.find(req.query).sort({createdAt: -1});
    res.status(200).json(visitors);
}

const getVisitor = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const visitor = await Visitor.findById(id)
    if (!visitor) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    res.status(200).json(visitor);
}

const deleteVisitor = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const visitor = await Visitor.findOneAndDelete({_id: id});
    if (!visitor) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(visitor);
}

const updateVisitor = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists'})
    }

    const visitor = await Visitor.findByIdAndUpdate(id, {...req.body})
    if (!visitor) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(visitor)
}

module.exports = {
    createVisitor,
    getVisitors,
    getVisitor,
    deleteVisitor,
    updateVisitor
}