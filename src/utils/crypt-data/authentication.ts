import { compare, hash } from "bcrypt";

export const generatePassword = (text: string): Promise<string> => {
  return hash(text, 10)
}

export const comparePassword = async (password: string, hashPasswordText: string): Promise<boolean> => {
  if (hashPasswordText !== '' || hashPasswordText !== null || password !== '') {
      let result = await compare(password, hashPasswordText);

      return result;
  } else {
      return false
  }
}