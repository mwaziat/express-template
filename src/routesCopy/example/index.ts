import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Hello, this is the route example.');
});

export default router;