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
