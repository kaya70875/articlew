export interface SectionProps {
  title: string;
  items: { definition: string; synonyms: string[]; examples: string[] }[];
  setWord: (word: string) => void;
}
