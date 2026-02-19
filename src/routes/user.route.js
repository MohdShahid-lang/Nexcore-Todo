import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";

const router = Router();

// 1. User Register
router.post ("/register" ,userRegister);

// 2. User login
router.post("/login", userLogin);


export default router