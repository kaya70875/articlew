import { authOptions } from "@/lib/auth";
import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      NextResponse.json({
        message: "Unauthorized",
        status: "401",
      });
    }
    await connectToDB();

    const { name, lastname } = await req.json();
    const updateUser = await user.updateMany(
      { email: session?.user.email },
      { $set: { name: name, lastname: lastname } },
      { new: true }
    );

    return NextResponse.json({
      message: "Profile updated",
      status: 200,
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({
      message: "Error while updating account informations",
      status: 502,
    });
  }
}
