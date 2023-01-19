import path from "path";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";

const register = (req, res) => {
  res.sendFile(path.resolve("public/html/register.html"));
};

const registerUser = async (req, res) => {
  await check("username")
    .notEmpty()
    .withMessage("El username ingresado no es correcto.")
    .run(req);

  await check("email")
    .isEmail()
    .withMessage("El email ingresado no es correcto.")
    .run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres.")
    .run(req);

  await check("repeat-password")
    .equals(req.body.password)
    .withMessage("Los passwords no coinciden.")
    .run(req);

  let result = validationResult(req);

  if (!result.isEmpty()) {
    return res.redirect("/register");
  }

  const { username, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    return res.redirect("/register");
  }

  await User.insertOne({ username, email, password });

  req.session.user = { username, email };

  return res.redirect("/home");
};

export { register, registerUser };
