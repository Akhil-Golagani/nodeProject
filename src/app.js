const express = require("express");

const app = express();

app.use("/user", 
[
(req, res, next) => {
    //Route handler
    console.log("Handling the 1st Route");
    //res.send("Response from 1st Route");
    next();
},
(req, res, next) => {
    console.log("Handling the 2nd Route");
    //res.send("Response from 2nd Route");
    next();
},
(req, res, next) => {
    console.log("Handling the 3rd Route");
    //res.send("Response from 3rd Route");
    next();
},
(req, res, next) => {
    console.log("Handling the 4th Route");
    //res.send("Response from 4th Route");
    next();
},
(req, res, next) => {
    console.log("Handling the 5th Route");
    res.send("Response from 5th Route");
}]);

app.listen(9966, () => {
    console.log("Server is listening to 9966");
});