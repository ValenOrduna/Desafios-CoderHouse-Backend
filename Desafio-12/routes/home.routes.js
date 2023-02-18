import express from "express";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

router.get("", (req, res) => {
  res.sendFile(path.resolve("public/html/home.html"));
});

router.get("/user", async (req, res) => {
  const { user } = req.session.passport;
  const findUser = await User.findById(user);
  res.send({ username: findUser.username });
});

router.get("/logout", (req, res) => {
  res.sendFile(path.resolve("public/html/logout.html"));
});

router.get("/logout/destroy", async (req, res) => {
  await req.session.destroy();
  res.send({ Success: "Session Delete" });
});

export default router;
