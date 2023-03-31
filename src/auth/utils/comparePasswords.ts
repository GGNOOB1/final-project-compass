import * as bcrypt from 'bcrypt';

export async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
