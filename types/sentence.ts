export type WordInfo = {
  definition: string;
  synonyms: string[];
  examples: string[];
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
