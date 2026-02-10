const express = require("express");
const {connectDB} = require("./config/database");
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/user");
const app = express();

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName : "Chaitanya",
        lastName : "Kakarlapudi",
        emailId : "chaitanyakakarlapudi@gmail.com",
        password : "Chaitu@123"
    });

    try{
        await user.save();
        res.send("User added successfully");
    }
    catch (err){
        res.status(400).send("Error saving the user :" + err.message);
    }
    
});

// app.get("/getAllUsers", (req, res) => {
//     res.send("User details fetched successfully");
// });

connectDB().then(()=>{
    console.log("Succesfully connected to database");
    app.listen(9966, () => {
        console.log("Server is listening to 9966");
    });
}).
catch((err)=>{
    console.log(err);
});

