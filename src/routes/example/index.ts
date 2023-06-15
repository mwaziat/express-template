import express from "express";
import { JwtVerify } from "../../middleware/jwt";

const router = express.Router();

/**
 * @openapi
 * /api/example/:
 *   get:
 *     description: Returns a mysterious string.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', (req, res) => {
  return res.send('Hello, this is the route example.');
});

/**
 * @openapi
 * /api/example/protected:
 *   get:
 *     description: Returns a protected message.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/protected', JwtVerify, (req, res) => {
  res.status(200).send({ message: 'Hello, this is the protected route example.' });
});

export default router;