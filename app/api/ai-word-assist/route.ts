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
      model: "EleutherAI/gpt-neo-2.7B",
      inputs: `Explain the usage of the word "${word}" in English. Provide corrections if necessary.`,
      parameters: {
        max_new_tokens: 60,
        temperature: 0.7,
        repetition_penalty: 1.2,
        return_full_text: false,
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
