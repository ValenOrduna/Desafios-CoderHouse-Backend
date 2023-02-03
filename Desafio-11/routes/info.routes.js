import express from "express";
import path from "path";

const router = express.Router();

router.get("", (req, res) => {
  res.sendFile(path.resolve("public/html/info.html"));
});

router.get("/getInfo", (req, res) => {
  const info = {
    args: process.argv,
    plataform: process.platform,
    version: process.version,
    rss: process.memoryUsage().rss,
    execPath: process.execPath,
    id: process.pid,
    dir: process.cwd(),
  };

  res.status(200).send(info);
});
export default router;
