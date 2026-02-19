import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // mongoose connection code here
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected successfully at ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
