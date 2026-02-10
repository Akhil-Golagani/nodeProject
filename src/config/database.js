const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect
    ("mongodb+srv://akhilgolagani528_db_user:g96MmCJRDmrx81AK@nodeproject.ne1ueef.mongodb.net/devTinder");
}

module.exports = {
    connectDB,
};

