import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, lastname, name, password } = await req.json();

  try {
    await connectToDB();

    const userExist = await user.findOne({ email });

    if (userExist) {
      console.log("User Already Exist");
      return NextResponse.json(
        { message: "User Already Exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentUser = await user.create({
      name: name,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await currentUser.save();
    console.log("Saved User : ", savedUser);

    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
