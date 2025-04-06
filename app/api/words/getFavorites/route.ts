import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const COLLECTION_NAME = "fav_sentences";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const db = await connectToDB();

  try {
    const collection = db?.collection(COLLECTION_NAME);
    const results = await collection?.find({ userId }).toArray();

    return NextResponse.json(results, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error Fetching Words" },
      { status: 500 }
    );
  }
}
