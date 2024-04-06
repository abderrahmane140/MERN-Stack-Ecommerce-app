const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const google = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // User with the same email already exists
            const { email, username, avatar } = existingUser;
            const token = createToken(existingUser._id);

            res.status(200).json({ email, username, token, avatar });
        } else {
            // User does not exist, proceed with creating a new user
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);

            const newUser = new User({
                username: (req.body.name ? req.body.name.split(' ').join('').toLowerCase() : '') + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });

            await newUser.save();

            const token = createToken(newUser._id);

            res.status(200).json({ email: newUser.email, username: newUser.username, token, avatar: newUser.avatar });
        }
    } catch (error) {
        console.error('Error during Google authentication:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { google };