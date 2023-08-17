const Client = require('../models/clientsModel')
const mongoose = require('mongoose')

const createClient = async (req, res) => {
    const {
        name,
    } = req.body

    let emptyFields = []
    if(!name) {
        emptyFields.push('name')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const client = await Client.create({
            name
        })
        res.status(200).json(client)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getClients = async (req, res) => {
    const {
      name
    } = req.query;

    const clients = await Client.find(req.query).sort({createdAt: -1});
    res.status(200).json(clients);
}

const getClient = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const client = await Client.findById(id)
    if (!client) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    res.status(200).json(client);
}

const deleteClient = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists.'})
    }

    const client = await Client.findOneAndDelete({_id: id});
    if (!client) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(client);
}

const updateClient = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record exists'})
    }

    const client = await Client.findByIdAndUpdate(id, {...req.body})
    if (!client) {
        return res.status(400).json({error: 'We could not action the request.'})
    }

    res.status(200).json(client)
}

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}