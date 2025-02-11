import { Sentence, WordInfo } from "./sentence";

export type FastApiResponse = {
  categories: string[] | null;
  max_length: number;
  min_lenght: number;
  order: "asc" | "desc";
  sentences: Sentence[];
  total_results: number;
  sort_by: string;
  word: string;
};

export type FastApiAIResponse = {
  response: string;
  score: number;
  paraphrase: string[];
};

export type FastApiWordResponse = {
  adjectives: WordInfo[];
  adverb: WordInfo[];
  verb: WordInfo[];
  noun: WordInfo[];
  pos: string;
};

export type FastApiCompareResponse = {
  similarities: string;
  differences: string;
  examples_word1: string[];
  examples_word2: string[];
};
