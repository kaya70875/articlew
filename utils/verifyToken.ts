import jwt from "jsonwebtoken";

export async function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as {
    email: string;
  };

  return decoded;
}
