import bcrypt from "bcrypt";
export const match_password = async (
  user_password: string,
  password: string
) => {
  let isMatch = await bcrypt.compare(password, user_password);

  return isMatch;
};
