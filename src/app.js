const express = require("express");

const {adminAuth, userAuth} = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user/getUser", userAuth, (req, res) => {
    res.send("User data fetched");
});

app.get("/user/login", (req, res) => {
    res.send("User logged successfully");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent successfully");
});

app.delete("/admin/deleteData", (req, res) => {
    res.send("Data deleted successfully");
});

app.listen(9966, () => {
    console.log("Server is listening to 9966");
});