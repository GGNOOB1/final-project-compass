import * as bcrypt from 'bcrypt';

export async function encryptPassword(password) {
  const salts = 12;

  const newPassword = await bcrypt.hash(password, salts);
  return newPassword;
}
