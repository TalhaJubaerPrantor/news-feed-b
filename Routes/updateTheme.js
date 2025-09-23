const express = require('express');
const userModel = require('../Models/userModel');
const router = express.Router();

router.put("/update",async (req, res) => {
    const { loggedEmail, scrollIntensity, selectedColor, selectedFont } = req.body
    const updatedUser = await userModel.findOneAndUpdate(
        { email: loggedEmail }, // Query to find the document
        {scrollIntensity,theme:selectedColor,font:selectedFont},       // Data to update
        { new: true }     // Options: return the updated document
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.send({ status: 200, updatedUser});
    // res.status(200).json(updatedUser);
})

module.exports = router;  