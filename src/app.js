const express = require("express");
const {connectDB} = require("./config/database");
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user :" + err.message);
    }
});

app.get("/getUserByEmail", async(req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId : userEmail});
        if(!user){
            res.send("No user found");
        }
        else{
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.get("/getUserById", async(req, res) => {
    const userId = req.query._id;
    console.log(userId);
    try {
        const user = await User.findById(userId);
        if(!user){
            res.send("No user found");
        }
        else{
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.get("/getAllUsers", async(req, res) => {
    try {
        const getUser = await User.find();
        res.send(getUser);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.delete("/deleteUser", async(req,res) => {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    try{
        if(!user){
            res.send("No user found");
        }else{
            res.send("Data deleted successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.put("/updateUser", async(req, res) => {
    try {
        const res = await User.findOne({firstName:"Rohit1"}).updateOne({lastName:"Sharma"});
        if(res.acknowledged === false){
            res.send("No user found");
        }
        else{
            res.send("Data Successfully Updated");
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/updateUserData", async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, data);
        if(!user){
            res.send("No user found");
        }
        else{
            res.send("Data Successfully Updated");
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

connectDB().then(()=>{
    console.log("Succesfully connected to database");
    app.listen(9966, () => {
        console.log("Server is listening to 9966");
    });
}).
catch((err)=>{
    console.log(err);
});

