import express from "express";
import passport from "passport";
import path from "path";

const router = express.Router();

router.get("", (req, res) => {
  res.sendFile(path.resolve("public/html/register.html"));
});

router.post(
  "",
  passport.authenticate("register", { failureRedirect: "/register" }),
  (req, res) => {
    res.send("Prueba");
  }
);

export default router;
