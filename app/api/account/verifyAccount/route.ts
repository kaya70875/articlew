import user from "@/models/user";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const res = await request.json();
    const { token } = res;

    if (!token)
      return NextResponse.json({ error: "Token not found" }, { status: 400 });

    const decoded = await verifyToken(token as string);

    if (!decoded.email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const updatedUser = await user.findOneAndUpdate(
      { email: decoded.email },
      { userVerified: true }
    );

    console.log(updatedUser);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(
      { message: "User verified successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
  }
}
