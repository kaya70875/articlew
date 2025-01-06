import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { mutate } from "swr";

const COLLECTION_NAME = "fav_sentences";

export async function POST(req: Request) {
  const { sentence, userId } = await req.json();

  const db = await connectToDB();

  try {
    const collection = db?.collection(COLLECTION_NAME);
    await collection?.createIndex('sentence', { unique: true });

    const results = await collection?.insertOne({
      sentence,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Word Added to Favorites", results },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error Adding Word to Favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { sentence, userId } = await req.json();

  const db = await connectToDB();

  try {
    const collection = db?.collection(COLLECTION_NAME);

    const results = await collection?.deleteOne({
      sentence,
      userId,
    });

    return NextResponse.json(
      { message: "Sentence Removed from Favorites", results },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error Removing Sentence from Favorites" },
      { status: 500 }
    );
  }
}
