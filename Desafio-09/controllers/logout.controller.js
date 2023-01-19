import path from "path";

const logout = (req, res) => {
  res.sendFile(path.resolve("public/html/logout.html"));
  req.session.destroy();
  res.clearCookie("user");
};

export { logout };
