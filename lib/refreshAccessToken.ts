import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import axios from "axios";

const ACCESS_TOKEN_EXPIRATION = "1m";

export async function refreshAccessToken(token: JWT, secret: string) {
  try {
    // Verify the refresh token (this could include checking its expiry)
    jwt.verify(token.refreshToken, secret);
    // If valid, sign a new access token with a new expiry time
    const newAccessToken = jwt.sign({ sub: token.id }, secret, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    console.log("Token Refreshed!");

    // Return updated token object with new access token and updated expiry
    return {
      ...token,
      accessToken: newAccessToken,
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

export async function refreshGoogleAccessToken(
  client_id: string,
  client_secret: string,
  token: JWT
) {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      })
    );

    const { access_token, expires_in } = response.data;

    console.log("Token Refreshed!");

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + 60 * 1000,
    };
  } catch (error: any) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
