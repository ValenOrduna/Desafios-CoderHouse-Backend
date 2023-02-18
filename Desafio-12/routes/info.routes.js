import express from "express";
import path from "path";
import os from "os";

const router = express.Router();

router.get("", (req, res) => {
  const info = {
    args: process.argv,
    plataform: process.platform,
    version: process.version,
    rss: process.memoryUsage().rss,
    execPath: process.execPath,
    id: process.pid,
    dir: process.cwd(),
    numProcess: os.cpus().length,
  };

  res.status(200).send(info);
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
    numProcess: os.cpus().length,
  };

  res.status(200).send(info);
});
export default router;
