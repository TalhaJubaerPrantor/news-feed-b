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
    console.log(loggedEmail)
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
    const { deletePref, loggedEmail } = req.body;

    // Find the user
    const user = await userModel.findOne({ email: loggedEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out the item to delete
    const newPrefArray = user.preferences.filter(pref => pref !== deletePref);

    // Update user document
    user.preferences = newPrefArray;
    await user.save();

    res.send({
      status:200,
      preferences: user.preferences
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

 
// router.put("/reqbookmark", async (req, res) => {
//     // console.log(req.body);
//     const { newsId, email } = req.body;
//     const user = await userModel.findOne({ email })
//     // check already added the bookmark
//     let markFlag = 0;
//     for (let i = 0; i < user.bookmarkedNews.length; i++) {
//         if (user.bookmarkedNews[i] == newsId) {
//             markFlag = 1
//         }
//     }
//     if (!markFlag) {
//         user.bookmarkedNews.push(newsId)
//         user.save()
//         res.send({id:newsId})
//     }
// })


module.exports = router;  