
import express from "express";
import DBGeneratorController from "../../controller/DB-generator/DBGeneratorController";

const router = express.Router();

router.post('/create', DBGeneratorController.BDCreate)
router.get('/table/create', DBGeneratorController.TableCreate)

export default router;