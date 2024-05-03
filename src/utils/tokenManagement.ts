import { RefreshToken } from "../entities/refresh-tokens.entity";

export const storeRefreshToken = async (userId: number, token: string) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);

  await RefreshToken.save({
    userId,
    token,
    expireDate,
  });
};

export const retrieveRefreshToken = async (token: string) => {
  const refreshToken = await RefreshToken.findOne({
    where: { token },
  });

  if (!refreshToken || refreshToken.expireDate <= new Date()) return null;
  return refreshToken.token;
};

export const removeRefreshToken = async (token: string) => {
  await RefreshToken.delete({ token });
};
