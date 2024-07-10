/*
To connect the DB we created this file in DB folder.

Note : 
Our database is in separate continent. So we have to use async await approach + try-catch approach to handle it.
*/







import { mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`
    ); // connectionIntance is an object returned during the db connection. To see the connection host we should console log "connectionInstance.connection.host".
  } catch (error) {
    console.log("MONGODB connection FAILED : ", error);
    process.exit(1);
  }
};


export default connectDB;