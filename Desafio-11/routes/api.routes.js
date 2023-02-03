import express from "express";
import { fork } from "child_process";
import path from "path";

const router = express.Router();

router.get("/randoms", (req, res) => {
  let cant = 100000000;
  const result = fork(path.resolve("utils/randomNumbers.js"));
  if (req.query.cant) {
    cant = req.query.cant;
  }
  result.send(cant);
  result.on("message", (data) => {
    res.send(data);
  });
});
export default router;
