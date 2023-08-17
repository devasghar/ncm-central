const Cred = require('../models/credsModel')
const mongoose = require('mongoose')

const createCred = async (req, res) => {
    const {
        username,
        password,
        url,
    } = req.body

    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }

    if (!password) {
        emptyFields.push('password')
    }

    if (!url) {
        emptyFields.push('url')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const cred = await Cred.create({
            username,
            password,
            url
        })
        res.status(200).json(cred)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getCreds = async (req, res) => {
    const {
        username,
        password,
        url,
    } = req.query;

    const creds = await Cred.find(req.query).sort({createdAt: -1});
    res.status(200).json(creds);
}

const getCred = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const cred = await Cred.findById(id)
    if (!cred) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    res.status(200).json(cred);
}

const deleteCred = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const cred = await Cred.findOneAndDelete({_id: id});
    if (!cred) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(cred);
}

const updateCred = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists'})
    }

    const cred = await Cred.findByIdAndUpdate(id, {...req.body})
    if (!cred) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(cred)
}

const findCreds = async (req, res) => {
    const {query} = req.params;

    const cred = await Cred.find({
        $or: [
            {username: {$regex: query, $options: 'i'}},
            {url: {$regex: query, $options: 'i'}},
        ],
    })

    if (!cred) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    if(cred.length === 0) {
        return res.status(200).json({error: 'This query produced no results.'})
    }

    res.status(200).json(cred)
}

module.exports = {
    createCred,
    getCreds,
    getCred,
    deleteCred,
    updateCred,
    findCreds
}