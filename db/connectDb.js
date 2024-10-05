import { mongoose } from "mongoose";
import { mongoDB } from "../src/secret.js";

// Database Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB database is connected");
  } catch (error) {
    console.log("MongoDB database connection faild");
  }
};

export default connectDB;
