import { NextResponse } from "next/server";
import PipelineSingleton from "../../classify/pipeline";

export async function POST(req: Request) {
  const { word } = await req.json();

  try {
    if (!word) {
      return NextResponse.json(
        { message: "Word is required" },
        { status: 400 }
      );
    }

    const pipeline = await PipelineSingleton.getInstance();

    // Call the Hugging Face text-generation API
    const response = await pipeline.textGeneration({
      model: "google/flan-t5-large",
      inputs: `I am going to give you a word and you first give me information about it like this format : The word 'what' is correct and usable in written English.
You can use it when you want to ask a question or indicate that you are asking for more information. For example: What did you mean by that?.

The word is '${word}'`,
      parameters: {
        max_new_tokens: 120,
        temperature: 0.7,
      },
    });

    // Parse response
    const result = response?.generated_text || "No result generated.";

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
