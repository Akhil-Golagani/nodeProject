const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "Akhil", lastName : "Golagani"})
});

app.post("/user", (req, res) => {
    res.send("User created successfully");
});

app.delete("/user", (req, res) => {
    res.send("User deleted successfully");
})

app.use("/test",(req,res)=>{
    res.send("Hello to the server 9966");
});

app.listen(9966, () => {
    console.log("Server is listening to 9966");
});