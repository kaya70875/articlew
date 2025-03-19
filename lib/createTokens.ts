import jwt, { SignOptions } from "jsonwebtoken";

export default async function createTokens(
  currentUser: any,
  JWT_SECRET: string,
  expAccessToken: string,
  expRefreshToken: string
) {
  //Create access and refresh tokens.
  const accessToken = jwt.sign(
    {
      sub: currentUser._id.toString(),
    },
    JWT_SECRET,
    { expiresIn: expAccessToken } as SignOptions
  );

  const refreshToken = jwt.sign(
    {
      sub: currentUser._id.toString(),
    },
    JWT_SECRET,
    { expiresIn: expRefreshToken } as SignOptions
  );

  return { accessToken, refreshToken };
}
