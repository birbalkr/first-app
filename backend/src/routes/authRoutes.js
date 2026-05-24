import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken =(userId) => {
    return jwt.sign({userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
}


router.post('/register', async(req, res) => {
    try {

        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }

        // check if user already exists in the database

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'User with this username already exists' });
        }

        // random avatar for the user using dicebear api
        const profilePicture = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;

        const user = new User({
            email,
            username,
            password,
            profilePicture,
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ 
            token,
            user: {
                id:user._id,
                email: user.email,
                username: user.username,
                profilePicture: user.profilePicture,
            },
        });

    } catch (error) {
        console.log("Error in /register route:", error);
        res.status(500).json({ message: 'Server error' });

    }
});

router.post('/login', (req, res) => {
    res.send('Login endpoint');
});

export default router;