const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;

        if(!token){
            throw new Error("Token is not valid");
        }

        const decodedObj = await jwt.verify(token, "Harry$0320");

        const user = await User.findById(decodedObj._id);

        if(user){
            req.user = user;
            next();
        }else{
            throw new Error("User not found");
        }
    } catch(err){
        res.status(400).send("Error:"+err.message)
    }
    
};

module.exports = {
    userAuth
}