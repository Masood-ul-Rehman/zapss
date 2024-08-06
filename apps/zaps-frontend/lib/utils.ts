import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const saltAndHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
export const comparePasswords = (password: string, hashedPassword: string) => {
  const passwordMatch = bcrypt.compareSync(password, hashedPassword);
  return passwordMatch;
};
