const express = require("express");

const app = express();

app.use("/hello",(req,res)=>{
    res.send("Hello to the server 9966");
})

app.use("/",(req,res)=>{
    res.send("Welcome to the server port 9966");
})

app.listen(9966, () => {
    console.log("Server is listening to 9966");
});