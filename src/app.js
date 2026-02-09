const express = require("express");

const app = express();

app.get(/^\/a(b)?c$/, (req, res) => {
    res.send({firstName : "Akhil", lastName : "Golagani"});
});

app.get("/user", (req, res) => {
    console.log(req.query);
    res.send({firstName: "Akhil", lastName : "Golagani"})
});

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({firstName: "Akhil", lastName : "Golagani"})
});


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