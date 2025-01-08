import { HfInference } from "@huggingface/inference";

// Define the type for the pipeline instance
type TextGenerationPipeline = {
  (input: string): Promise<any>;
};

// Use the Singleton pattern to enable lazy construction of the pipeline.
const P = () => class PipelineSingleton {
  static instance: HfInference | null = null;

  static async getInstance(): Promise<HfInference> {
    if (this.instance === null) {
      this.instance = new HfInference(process.env.HUGGING_FACE_API_KEY);
    }
    return this.instance;
  }
};

let PipelineSingleton: ReturnType<typeof P>;
if (process.env.NODE_ENV !== 'production') {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!(global as any).PipelineSingleton) {
    (global as any).PipelineSingleton = P();
  }
  PipelineSingleton = (global as any).PipelineSingleton;
} else {
  PipelineSingleton = P();
}

export default PipelineSingleton;