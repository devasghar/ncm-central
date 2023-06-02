const express = require('express');
const router = express.Router();
const {
    createCred,
    getCreds,
    getCred,
    deleteCred,
    updateCred
} = require('../controllers/credsController')

router.post('/', createCred);

router.get('/', getCreds);

router.get('/:id', getCred);

router.delete('/:id', deleteCred);

router.patch('/:id', updateCred);

module.exports = router;
