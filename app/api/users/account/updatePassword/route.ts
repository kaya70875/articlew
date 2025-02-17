import { authOptions } from "@/lib/auth";
import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    await connectToDB();

    const { currentPassword, newPassword } = await req.json();

    if (!newPassword)
      return NextResponse.json(
        { message: "Missing New Password" },
        { status: 400 }
      );

    const currentUser = await user.findOne({ userId });

    //Check if current password is correct.
    const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Current password is wrong" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await user.updateOne({
      password: hashedPassword,
      new: true,
    });

    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
      data: updatedPassword,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while updating user!" },
      { status: 502 }
    );
  }
}
