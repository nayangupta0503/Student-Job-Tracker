const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected Successfully")
    }catch(err){
        console.error("MongoDb connection Failed",err)
        process.exit(1)
    }
}

module.exports = connectDB;