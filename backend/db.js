const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/stock&stash?directConnection=true";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
    console.log("connected to mongo")
}

module.exports = connectToMongo;