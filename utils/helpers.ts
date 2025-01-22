import { useSentenceCardActions } from "@/hooks/useSentenceCardActions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const getSourceName = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "").replace(/\.[a-z]{2,}$/i, "");
  } catch (error) {
    return url;
  }
};

export const getCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};

export const getCurrentWord = () => {
  const params = useSearchParams();
  return params.get("word") || "";
};

export const runSpeaker = async (
  sentence: string,
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { readSentenceWithAI } = useSentenceCardActions();
  setIsSpeaking(true);
  const response = await readSentenceWithAI(sentence);
  const audio = new Audio(response.audioUrl);
  audio.onended = () => setIsSpeaking(false);
  audio.onerror = () => setIsSpeaking(false);
  audio.play();
};

/**
 * Highlights all occurrences of a specific word in a sentence by wrapping them in a `<span>` tag
 * with a CSS class for styling (e.g., bold and underline).
 *
 * Args:
 *     sentence (str): The input sentence or text where the word needs to be highlighted.
 *     word (str): The word to be highlighted.
 *     className : The CSS class to be applied to the highlighted word. (eg : text-red-500)
 *
 * Returns:
 *     str: The sentence with the specified word wrapped in `<span>` tags for highlighting.
 */

export const highlighWord = (
  sentence: string,
  word: string,
  className: string = ""
) => {
  const highlightedSentence = sentence?.replace(
    new RegExp(`(${word})`, "gi"),
    (match) => `<span class="font-bold underline ${className}">${match}</span>`
  );

  return highlightedSentence;
};

/**
 * Formats a given text by italicizing all substrings enclosed in double quotes. This is typically
 * used to emphasize example sentences or quoted text.
 *
 * @param {string} text - The input text containing example sentences or quoted text.
 * @returns {string} The text with quoted substrings wrapped in `<em>` tags for italic formatting.
 */
export const prettyAIResponse = (text: string) => {
  // Regex to find the example sentence (text within quotes)
  const regex = /"(.*?)"/g;

  // Replace the example sentence with an italic version
  const formattedText = text?.replace(regex, '<em>"$1"</em>');
  return formattedText;
};
