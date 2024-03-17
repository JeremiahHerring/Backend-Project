const express = require('express')
router = express.Router()
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register an admin
router.post("/register", async (req, res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })

        res.status(200).send("Admin Added to the Database")
    }
    catch(err){
        res.json({staus:'error', error: 'Duplicate email'})
    }
})

// Admin Login 
router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({
        email: req.body.email
    })

    if(!admin){
        return res.json({status: 'error', error: 'Invalid Login'})
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password
    )

    if(isPasswordValid){
        const token = jwt.sign(
            {
                name: admin.name,
                email: admin.email
            },
            'admin'
        )
        // Return Admin JWT if successful
        return res.json({status:'Ok', admin:token})
    }else{
        return res.json({status: 'error', admin: false})
    }
})



module.exports = router