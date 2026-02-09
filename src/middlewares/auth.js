const adminAuth = (req, res, next) => {
    console.log("Admin authorization called");
    const token = "1234";
    const isTokenAuthorized = token === "1234";

    if(isTokenAuthorized){
        next();
    }
    else{
        res.status(401).send("Unauthorized Token");
    }
};

const userAuth = (req, res, next) => {
    console.log("User authorization called");
    const token = "1234";
    const isTokenAuthorized = token === "1234";

    if(isTokenAuthorized){
        next();
    }
    else{
        res.status(401).send("Unauthorized Token");
    }
};

module.exports = {
    adminAuth,
    userAuth
}