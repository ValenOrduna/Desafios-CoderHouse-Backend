import express from "express";
import path from "path";
import passport from "passport";

const router = express.Router();

router.get("", (req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
});

router.post(
  "",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  (req, res) => {
    res.status(300).send({ Success: "User Login" });
  }
);

export default router;
