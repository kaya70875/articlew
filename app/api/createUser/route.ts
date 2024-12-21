import user from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req : Request) {
    const {name , email , password} = await req.json();

    try {
        await connectToDB();

        const userExist = await user.findOne({email});

        if(userExist) {
            return NextResponse.json({message : 'User Already Exist'}, {status : 400});
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const currentUser = await user.create({name : name , email : email , password : hashedPassword});

        const savedUser = await currentUser.save();
        console.log('Saved User : ', savedUser);

        return NextResponse.json({message : 'User Created Successfully'}, {status : 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : 'Internal Server Error'}, {status : 500});
    }
}