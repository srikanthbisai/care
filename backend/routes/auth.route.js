import express from "express";
import {Login, Register, Logout, GuestLogin} from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout)
router.post("/guest-login", GuestLogin);
export default router;

