import { connectToDB } from "@/utils/database";

export async function getUserWithEmail(email: string | undefined | null) {
  if (!email) return null;
  const db = await connectToDB();
  const usersCollection = db!.collection("users");

  // Check if user already exists in the database
  const existingUser = await usersCollection.findOne({
    email: email,
  });

  return existingUser;
}
