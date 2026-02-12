const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 20
    },
    lastName : {
        type : String,
        trim : true,
        minlength : 5,
        maxlength : 20
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        minlength : 5,
        maxlength : 20
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value.toLowerCase())){
                throw new Error("Gender is not valid");   
            }
        } 
    },
    photoUrl : {
        type : String
    },
    about : {
        type : String,
        default : "This is default about of the user!"
    },
    skills : {
        type : [String],
    }
},
{
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);