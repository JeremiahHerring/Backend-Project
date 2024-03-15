const express = require('express')
router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, 'secret123', (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

// Create a new user
router.post('/register', async (req, res) => {
    try {
        // Encrypt the password for security purposes
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.status(200).send("User Added to the Database")
    } 
    catch (error) {
        res.json({status:'error', error: 'Duplicate email'})
    }
})

// User login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid Login' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        );

        return res.json({ status: 'Ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

// Delete User with authentication
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

// Update user information 
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verify if the current user is the same as the user being updated
        if (req.user.email !== email) {
            return res.status(403).send("You are not allowed to update other users");
        }

        // Hash the new password if it's being updated
        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);
    } catch(error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router