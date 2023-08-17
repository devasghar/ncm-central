const express = require('express');
const router = express.Router();
const {
    getToken
} = require('../controllers/authController')

router.post('/login', getToken);

module.exports = router;
