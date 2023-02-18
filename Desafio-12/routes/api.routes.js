import express from "express";
import path from "path";
import randomNumber from "../utils/randomNumbers.js";
import { PORT } from "../index.js";

const router = express.Router();

router.get("/randoms", (req, res) => {
  let cant = 100000000;
  if (req.query.cant) {
    cant = req.query.cant;
  }
  const result = randomNumber(cant);
  res.status(200).json({ process: process.pid, port: PORT, data: result });
});
export default router;
