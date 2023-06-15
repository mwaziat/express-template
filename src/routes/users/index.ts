
import express from "express";
import UsersController from "../../controller/users/UsersController";
import validationSchema from "../../middleware/validation-schema";
import {createUserSchema, updateUserSchema} from "../../utils/schema/users";
import { JwtVerify } from "../../middleware/jwt";

const router = express.Router();

router.get('/', JwtVerify, UsersController.GetUsers)
router.get('/:id', JwtVerify, UsersController.GetOneUser)
router.post('/create', [JwtVerify, validationSchema(createUserSchema)], UsersController.createUser)
router.put('/:id', [JwtVerify, validationSchema(updateUserSchema)], UsersController.updateUser)

export default router;