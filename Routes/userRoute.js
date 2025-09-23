const express = require('express');
const userModel = require('../Models/userModel');
const router = express.Router();

router.get('/getuser/:email', async(req,res)=>{
    const reqEmail=req.params.email;
    const user=await userModel.find({ email:reqEmail });
    res.send({ status: 200, user:user[0] });
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
        
    const userExists = await userModel.findOne({ email });
    if(!userExists){
        const newUser = new userModel({ name, email, password ,scrollIntensity:5,theme:"cyan",font:"arial"});
        await newUser.save()
        .then(res.send({ status: 200 ,user: newUser}))
    }else{
        res.send({ status: 400, message: "User already exists" });
    }

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email, password: password });
    if (user) {
        res.send({ status: 200, user: user });
    } else {
        res.send({ status: 400, message: "Invalid email or password" });
    }

})

module.exports = router;