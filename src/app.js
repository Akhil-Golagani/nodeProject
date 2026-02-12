const express = require("express");
const {connectDB} = require("./config/database");
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/user");
const app = express();
const signUpValidate = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

app.post("/signup", async(req, res) => {

    try {

        const {firstName, lastName, emailId, password} = req.body;

        //validation of data
        signUpValidate(req);
        console.log(password);

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        const isMatch = await bcrypt.compare(password, passwordHash);
        console.log(isMatch);

        if(isMatch){
            const user = new User({
                firstName, lastName, emailId, password : passwordHash
            });
            await user.save();
            res.send("User added successfully");
        } else {
            throw new Error("Password encryption error");
        }        
        
    } catch (err) {
        res.status(400).send("Error saving the user :" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try{

        const {emailId, password} = req.body;

        if(!emailId || !password){
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({emailId});

        if(!user){
            throw new Error("Invalid credentials");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(passwordCheck){
            res.send("User logged successfully")
        }else{
            throw new Error("Invalid credentials")
        }

    } catch(err){
        res.status(400).send("Login Error : "+err.message);
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
    console.log(userId)
    const data = req.body;
    console.log(data)

    try {
        const UPDATE_ALLOWED = ["photoUrl","about","age","skills","gender"];
        const inValidKeys = Object.keys(data).filter(
            (k) => !UPDATE_ALLOWED.includes(k)
        );
        console.log(inValidKeys);

        if(inValidKeys.length > 0){
            throw new Error("Update not allowed. Invalid fields : "+inValidKeys.join(","));
        }

        if(data.skills && data.skills.length > 4){
            throw new Error("Skills can't be more than 4");
        }

        const user = await User.findByIdAndUpdate(userId, data);
        if(!user){
            res.send("No user found");
        }
        else{
            res.send("Data Successfully Updated");
        }
    } catch (err) {
        res.status(400).send("UPDATE FAILED : "+err.message);
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

