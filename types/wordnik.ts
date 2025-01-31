export interface WordnikDefinition {
  id: string;
  text: string;
  word: string;
  partOfSpeech: string;
  exampleUses: {
    text: string;
  }[];
}

export interface WordnikSynonym {
  relationshipType: string;
  words: string[];
}
