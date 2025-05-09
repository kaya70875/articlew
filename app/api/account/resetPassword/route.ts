import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Missing token or new password" },
        { status: 400 }
      );
    }

    const payload = await verifyToken(token); // Decode and verify the token
    const email = payload.email; // Extract the email from the token payload

    const currentUser = await user.findOne({ email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.updateOne({
      password: hashedPassword,
      new: true,
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
