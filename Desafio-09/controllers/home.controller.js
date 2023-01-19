import path from "path";

const checkUser = (req, res, next) => {
  req.session.user && req.cookies.user ? next() : res.redirect("/register");
};

const home = (req, res) => {
  res.sendFile(path.resolve("public/html/home.html"));
};

const getUser = (req, res) => {
  res.send(req.session.user);
};

export { checkUser, home, getUser };
