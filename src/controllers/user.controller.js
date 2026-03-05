import { User } from "../models/user.model.js";
import { compareHashedPassword, generateHashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken"
// 1.user Register 
// 2.user login
// 3.user logout

export const userRegister = async (req, res) => {
    try {
        console.log(req.body)
        // 1. Required fields
        const { name, email, password } = req.body;



        // 2. Basic Validations
        if (!name || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 3.check if the data exists in db 
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 4.password Hash
        const hashPassword = await generateHashPassword(password)

        //5.create a new user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        return res.status(201).json({
            message: "User created successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,

            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const userLogin = async (req, res) => {
    try {
        // 1. Required fields
        const { email, password } = req.body;

        // 2. Basic Validations
        if (!password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 3.check if the data exists in db 
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({ message: "User not  found" });
        }

        // 4. compare the password
        const comparePassword = await compareHashedPassword(password, existingUser.password)

        // 5. Json web token
        if (comparePassword === false) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: existingUser._id,
            name: existingUser.name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h", });


        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                email: existingUser.email,
                id: existingUser._id,
                name: existingUser.name,
                token,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};