import express, {Application, Router, Request, Response, NextFunction} from "express";
import RegisterRoutes from ".";

const router = Router();

RegisterRoutes(router, 'health', { prefix: "api/check-health" })
RegisterRoutes(router, 'example', { prefix: "api/example" })
RegisterRoutes(router, 'users', { prefix: "api/users" })
RegisterRoutes(router, 'users/roles', { prefix: "api/roles" })
RegisterRoutes(router, 'db-generator', { prefix: "api/db" })

export default router;

