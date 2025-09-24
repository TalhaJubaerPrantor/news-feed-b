const express = require('express');
const userModel = require('../Models/userModel');
const router = express.Router();

router.get("/prefernce/:email", async (req, res) => {
    const {email}=req.params
    const user=await userModel.findOne({email})
    res.send(user.preferences)
})

router.put("/addprefernce", async (req, res) => {
    const {newPref,loggedEmail}=req.body;
    const user = await userModel.findOne( {email:loggedEmail} )
    let markFlag=0;
    for(let i=0;i<user.preferences.length;i++){
        if(user.preferences[i]==newPref) markFlag=1
    }

    if(!markFlag){
        user.preferences.push(newPref);
        user.save();
        res.send({preferences:user.preferences})
    }

})


router.put("/deletepreference", async (req, res) => {
  try {
    const { id, loggedEmail } = req.body;

    // Find the user
    const user = await userModel.findOne({ email: loggedEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out the item to delete
    const newBookedArray = user.bookmarkedNews.filter(bookedNews => bookedNews !== id);

    // Update user document
    user.bookmarkedNews = newBookedArray;
    await user.save();

    res.send({
      status:200,
      bookmarkedNews: user.bookmarkedNews
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

 


module.exports = router;  