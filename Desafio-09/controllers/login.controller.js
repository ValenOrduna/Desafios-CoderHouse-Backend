import path from "path";
import User from "../models/User.js";

const checkUser = (req, res, next) => {
  req.session.user && req.cookies.user ? res.redirect("/home") : next();
};

const login = async (req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    console.log(req.session.user, req.cookies.user);
    if (user.password === password) {
      req.session.user = { username: user.username, email: user.email };
      return res.redirect("/home");
    }
  } else {
    return res.redirect("/login");
  }
};

export { checkUser, login, loginUser };
