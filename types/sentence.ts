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
  paraphrase: string[];
};

export type FastApiWordResponse = {
  adjectives: WordInfo[];
  adverb: WordInfo[];
  verb: WordInfo[];
  noun: WordInfo[];
};

export type WordInfo = {
  definition: string;
  synonyms: string[];
  examples : string[];
};

export type Sentence = {
  _id: string;
  text: string;
  source: string;
  category: string;
  length: number;
  date: string;
};

export type BaseEntity = {
  _id: string;
  userId: string;
  createdAt: Date;
};

export type FavoriteSentences = BaseEntity & {
  sentence: string;
  categoryId: string | null;
  highlightedWord: string;
};

export type CategorySentence = BaseEntity & {
  category: string;
};
