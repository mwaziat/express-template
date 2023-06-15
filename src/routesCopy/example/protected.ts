import express from "express";
import { JwtVerify } from "../../middleware/jwt";

const router = express.Router();

router.get('/protected', JwtVerify, (req, res) => {
  res.status(200).send({message: 'Hello, this is the route example protected.'}).json();
});

export default router;