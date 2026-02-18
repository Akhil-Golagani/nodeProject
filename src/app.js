const express = require("express");
const {connectDB} = require("./config/database");
const {userAuth} = require("./middlewares/auth");
const User = require("./models/user");
const app = express();
const signUpValidate = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) => {

    try {

        const {firstName, lastName, emailId, password} = req.body;

        //validation of data
        signUpValidate(req);
        console.log(password);

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        const isMatch = await bcrypt.compare(password, passwordHash);

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
            const token = jwt.sign({_id : user._id}, "Harry$0320");
            res.cookie("token", token);
            res.send("User logged successfully");
        }else{
            throw new Error("Invalid credentials")
        }

    } catch(err){
        res.status(400).send("Login Error : "+err.message);
    }
});

app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user;
        if(user){
            res.send(user);
        }
    } catch (err){
        res.status(400).send("Error :"+err.message);
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

