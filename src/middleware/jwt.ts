require('dotenv')
import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { UserLogin } from "./user-login";

const secret_key = process.env.JWT_TOKEN as string;

export const JwtVerify = (req: Request<any>, res: Response<IResponseError>, next: NextFunction) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({status: 0, message: 'Authorization header is missing'});

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ status: 0, message: 'Format token not accepted' });

  verify(
    token,
    secret_key,
    (err, decodedToken) => {
      if (err) return res.status(403).json({ status: 0, message: 'Token invalid' })

      const decoded = decodedToken as JwtPayload;
      const expired = decoded?.exp

      if (expired && Date.now() >= expired * 1000) {
        return res.status(401).json({ status: 0, message: 'Token expired' });
      }

      const userLogin = UserLogin(decoded?.id ? parseInt(decoded.id) : 0)
      if (!userLogin) return res.status(401).send({ status: 0, message: 'User Cannot access' });
      next();
    }
  )
  
}