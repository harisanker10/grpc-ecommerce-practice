import { compare } from 'bcrypt';

export default async function validatePassword(password: string, hash: string) {
  return await compare(password, hash);
}
