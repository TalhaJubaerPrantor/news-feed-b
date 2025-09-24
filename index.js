const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
app.use(express.json());      // ✅ Must be before app.post(...) routes
app.use(express.urlencoded({ extended: true })); // optional if you also expect form data
const userRoute = require('./Routes/userRoute');
const updateTheme=require('./Routes/updateTheme')
const bookMarkRoute=require('./Routes/bookMarkRoute')
const preferenceRoute=require('./Routes/preferenceRoute')



// Fetching the newses from the hacker news API so that we I can modify it
app.get("/", async (req, res) => {
    const news = [];
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const ids = await response.json();
    for (let i = 0; i < 10; i++) {
        const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`);
        const jsonResult = await result.json();
        jsonResult.bookmarkedUsers = [];
        news.push(jsonResult);

    }
    // console.log(news)
    res.json(news);
});

app.get("/getuser/:email",userRoute)
app.post("/login", userRoute)
app.post("/register", userRoute)
app.put("/update",updateTheme)
app.put("/reqbookmark",bookMarkRoute) 
app.get("/bookmarks/:email",bookMarkRoute) 
app.put("/addprefernce",preferenceRoute)
app.get("/prefernce/:email",preferenceRoute)
app.put("/deletepreference",preferenceRoute)
app.post("/googledetails",userRoute)
app.post("/deletebookmark",bookMarkRoute)


mongoose.connect("mongodb+srv://talhajubaer3121:7264@cluster0.timlqzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


// Start the server
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});