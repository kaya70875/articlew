import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { sentence } = await req.json();

  try {
    if (!sentence) {
      return NextResponse.json(
        { message: "Sentence is required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
      {
        inputs: sentence,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
        responseType: 'arraybuffer',
      }
    );

    const audioBuffer = Buffer.from(response.data, 'binary').toString('base64');
    const audioUrl = `data:audio/wav;base64,${audioBuffer}`;

    return NextResponse.json({ audioUrl }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "There was an error while reading text" },
      { status: 500 }
    );
  }
}