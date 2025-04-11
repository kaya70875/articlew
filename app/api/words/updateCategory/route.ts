import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const { category, sentenceId, userId } = await req.json();
  try {
    if (!userId || !category || !sentenceId) {
      return NextResponse.json(
        { message: "User ID, category and sentence ID are required" },
        { status: 400 }
      );
    }

    const db = await connectToDB();
    const collection = db?.collection("fav_sentences");
    const result = await collection?.updateOne(
      { _id: new ObjectId(sentenceId), userId },
      { $set: { categoryId: category } }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error("Error while updating category", e);
    return NextResponse.json(
      { message: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  try {
    if (!userId || !category) {
      return NextResponse.json(
        { message: "User ID and category are required" },
        { status: 400 }
      );
    }

    const db = await connectToDB();
    const collection = db?.collection("fav_sentences");
    const result = await collection
      ?.find({ categoryId: category, userId })
      .toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error("Error while updating category", e);
    return NextResponse.json(
      { message: "Error updating category" },
      { status: 500 }
    );
  }
}
