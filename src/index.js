/*
As soon as possible we should import the "dotenv"
*/

// require('dotenv').config() // Consistency is not maintained in the code.
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB();









/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
      console.log("ERROR : ", error);
      throw error;
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("ERROR : " + err);
    throw err;
  }
})();
*/
