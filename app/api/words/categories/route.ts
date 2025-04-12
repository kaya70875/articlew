import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const COLLECTION_NAME = "sentence_categories";

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
  const collection = db?.collection(COLLECTION_NAME);
  const categories = await collection?.find({ userId }).toArray();

  return NextResponse.json(categories, { status: 200 });
}

export async function POST(req: Request) {
  const { category, userId } = await req.json();

  if (!userId || !category) {
    return NextResponse.json(
      { message: "User ID and category are required" },
      { status: 400 }
    );
  }

  const db = await connectToDB();
  const collection = db?.collection(COLLECTION_NAME);
  const result = await collection?.insertOne({
    userId,
    category,
    createdAt: new Date(),
  });

  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(req: Request) {
  const { category, userId } = await req.json();

  if (!userId || !category) {
    return NextResponse.json(
      { message: "User ID and category are required" },
      { status: 400 }
    );
  }

  const db = await connectToDB();
  const collection = db?.collection(COLLECTION_NAME);
  const result = await collection?.deleteOne({ userId, category });

  return NextResponse.json(result, { status: 200 });
}
