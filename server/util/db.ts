require("dotenv").config();
import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URL || '';
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data: any) => {
            console.log("Database connected with " + data.connection.host);
        })
    } catch (error: any) {
        setTimeout(connectDB, 5000)
    }
}

export default connectDB;