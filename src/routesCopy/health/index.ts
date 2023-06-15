import express from "express";

const router = express.Router();

/**
 * @openapi
 * /api/check-health:
 *   get:
 *      tag:
 *        -Health-Check 
 *        description: Welcome to swagger-jsdoc!
 *        responses:
 *          200:
 *          description: Returns a mysterious string.
 */

router.get('/', (req, res) => {
  return res.status(200).send('OK.');
});

export default router;