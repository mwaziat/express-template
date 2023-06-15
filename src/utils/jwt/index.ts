require('dotenv')
import { sign } from "jsonwebtoken";

const secret_key = process.env.JWT_TOKEN as string;

export const generateToken = (payload: {}): string => {
  const token = sign(
      payload,
      secret_key,
      { expiresIn: '480m' }
  );
  return token;
}

export const generateRefreshToken = (payload: {}): string => {
  const token = sign(
      payload,
      secret_key,
      { expiresIn: '180d' }
  );
  return token;
}