import express from "express";
import { checkUser, home, getUser } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", checkUser, home);

router.get("/user", getUser);

export default router;
