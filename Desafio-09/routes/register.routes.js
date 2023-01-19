import express from "express";
import { checkUser } from "../controllers/login.controller.js";
import { register, registerUser } from "../controllers/register.controller.js";

const router = express.Router();

router.get("/", checkUser, register);

router.post("/", registerUser);

export default router;
