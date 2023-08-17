const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const getToken = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({message: 'Authentication failed'});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword)
        if (!validPassword) {
            return res.status(401).json({message: 'Authentication failed'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({token});
    } catch (error) {
        res.status(500).json({message: 'An error occurred'});
    }
}

module.exports = {
    getToken,
}