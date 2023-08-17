const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/usersController')

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;
