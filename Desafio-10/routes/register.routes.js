import express from "express";
import passport from "passport";
import path from "path";

const router = express.Router();

router.get("", (req, res) => {
  res.sendFile(path.resolve("public/html/register.html"));
});

router.post(
  "",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
  }),
  (req, res) => {
    res.status(300).send({ Success: "User Created" });
  }
);

router.get("/registerError", (req, res) => {
  res.sendFile(path.resolve("public/html/registerError.html"));
});
export default router;
