import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const ACCESS_TOKEN_EXPIRATION = "1m";

export default async function refreshAccessToken(token: JWT, secret: string) {
  try {
    // Verify the refresh token (this could include checking its expiry)
    jwt.verify(token.refreshToken, secret);
    // If valid, sign a new access token with a new expiry time
    const newAccessToken = jwt.sign({ sub: token.id }, secret, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    // Return updated token object with new access token and updated expiry
    return {
      ...token,
      accessToken: newAccessToken,
      // Optionally update accessTokenExpires (in milliseconds)
      accessTokenExpires: Date.now() + 60 * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
