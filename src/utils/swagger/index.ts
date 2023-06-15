import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version, name, description } from '../../../package.json';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const apiDirectory = join(__dirname, '../../../src/routes');
const routesApi = getFilesRecursively(apiDirectory, ['.ts', '.js'])
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: name,
      version,
      description: description
    },
    components: {
      securitySchema: {
        bearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: [...routesApi],
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app: Express) => {
  // Menampilkan dokumentasi Swagger di Swagger UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Menyediakan spesifikasi Swagger dalam format JSON
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

function getFilesRecursively(directoryPath: string, fileExtensions: string[]): string[] {
  const files = readdirSync(directoryPath);

  let result: string[] = [];

  files.forEach((file) => {
    const filePath = join(directoryPath, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      const subdirectoryFiles = getFilesRecursively(filePath, fileExtensions);
      result = result.concat(subdirectoryFiles);
    } else if (fileExtensions.some((ext) => file.endsWith(ext))) {
      result.push(filePath);
    }
  });

  return result;
}


export default swaggerDocs


