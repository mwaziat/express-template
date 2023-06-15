import { ErrorObject, JSONSchemaType } from "ajv";
import { Request, Response, NextFunction } from "express";
import ajvInstance from "../utils/schema/ajv-instance";

const validationSchema = (schema: JSONSchemaType<any>) => {
  return (req: Request<any>, res: Response, next: NextFunction) => {
    const validate = ajvInstance.compile(schema);
    const isValid = validate(req.body);

    if (!isValid) {
      const errors: ErrorObject[] | null | undefined = validate.errors;

      if (errors != null) {
        const formattedErrors = errors.map((error) => {
          return ({
            property: error.params.missingProperty,
            instancePath: error.instancePath,
            message: error.message,
          })
        });

        return res.status(400).json({ errors: formattedErrors });
      }
    }
    next();
  }
}

export default validationSchema