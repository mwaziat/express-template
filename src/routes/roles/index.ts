import RolesController from "../../controller/users/RolesController";
import express from "express";

const router = express.Router();

router.get('/', RolesController.GetRoles)
router.get('/:id', RolesController.GetOneRole)
router.post('/create', RolesController.createRole)
router.put('/:id', RolesController.updateRole)

export default router;