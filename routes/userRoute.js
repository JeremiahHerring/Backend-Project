const express = require('express')
router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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




module.exports = router