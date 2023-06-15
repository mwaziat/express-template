import express, { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const router = express.Router();

const registerRoutes = (app: Router, directory: string, options: { prefix?: string } = {}): void => {
  const { prefix = '' } = options;

  const normalizedPath = join(__dirname, directory);
  const files = readdirSync(normalizedPath);

  files.forEach((file) => {
    const routePath = join(normalizedPath, file);
    const route: Router = require(routePath).default;

    if (prefix) {
      app.use(`/${prefix}`, route);
    } else {
      app.use(route);
    }
  });
};

export default registerRoutes;
