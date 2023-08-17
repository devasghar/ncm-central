const express = require('express');
const router = express.Router();
const {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
} = require('../controllers/clientsController')

router.post('/', createClient);

router.get('/', getClients);

router.get('/:id', getClient);

router.delete('/:id', deleteClient);

router.patch('/:id', updateClient);

module.exports = router;
