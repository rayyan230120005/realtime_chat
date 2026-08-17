import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

export const connectDB = async () =>
{
    try 
    {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI || "mongodb://localhost:27017"}/${DB_NAME}`);
       
       console.log(`\n Mongo DB connected successfully ! DB HOST: ${connectionInstance.connection.host}`);

    } 
    catch (error) 
    {
       console.error("Mongo DB connection error :", error );
       process.exit(1);   
    }
}