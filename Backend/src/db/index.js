import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Connected to the database: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to the databse: ${error.message}`);
  }
}

export default connectDB;
//connect bd