import express from 'express';
import healthCheck from "./health";
import example from "./example";
import users from "./users";
import roles from "./roles";
import database from "./db-generator";

const router = express.Router();

router.use("/api/check-health", healthCheck)
router.use("/api/example", example)
router.use("/api/users", users)
router.use("/api/roles", roles)
router.use("/api/db", database)

export default router;
