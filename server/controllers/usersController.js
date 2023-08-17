const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const createUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);

        res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const {newPassword} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, {password: hashedPassword});

        res.json({message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}