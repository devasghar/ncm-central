const express = require('express');
const router = express.Router();
const {
    createCred,
    getCreds,
    getCred,
    deleteCred,
    updateCred,
    findCreds
} = require('../controllers/credsController')

router.post('/', createCred);

router.get('/', getCreds);

router.get('/:id', getCred);

router.delete('/:id', deleteCred);

router.patch('/:id', updateCred);

router.get('/find/:query', findCreds);

module.exports = router;
