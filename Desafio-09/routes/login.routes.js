import express from "express";
import {
  checkUser,
  login,
  loginUser,
} from "../controllers/login.controller.js";

const router = express.Router();

router.get("/", checkUser, login);

router.post("/", loginUser);

export default router;
