const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    preferences: { type: Array },
    scrollIntensity: { type: Number },
    theme: { type: String },
    font: { type: String },
    bookmarkedNews: { type: Array }

})

module.exports =new mongoose.model("User", userSchema);