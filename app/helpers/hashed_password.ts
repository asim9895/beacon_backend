import bcrypt from "bcrypt";

export const hashed_password = async (password: string) => {
  let hash = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, hash);
};
