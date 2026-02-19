import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import todoRoutes from "./routes/todo.route.js"
import { verifyJWT } from './middlewares/auth.middeleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", verifyJWT , todoRoutes);

connectDB();

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});