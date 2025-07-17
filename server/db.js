const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully !!");
  } catch (error) {
    console.error("Error connecting DB: ", error.message);
  }
}

module.exports = connectDB;