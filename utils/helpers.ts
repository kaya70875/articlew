import { useSentenceCardActions } from "@/hooks/useSentenceCardActions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

/**
 * Fetches the name of the source from a given URL.
 * @param url : string;
 * @returns name : string;
 */
export const getSourceName = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "").replace(/\.[a-z]{2,}$/i, "");
  } catch (error) {
      return console.log(error);
  }
};

/**
 * Fetches the current user from the session.
 * @returns user : object;
 */

export const getCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};

/**
 * Gets current word from the URL.
 * @returns currentWord : string;
 */
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
 * Speaks the given sentence using the browser's speech synthesis API.
 * @param sentence : string;
 */

export const speakSentence = (sentence: string) => {
  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
};

/**
 * Extracts the content from a given HTML string that is wrapped in a `<span>` tag.
 * Returns the string inside the `<span>` tag with full text.
 *
 * Args:
 *  htmlString (str): The input HTML string containing the content to be extracted.
 * Returns:
 *  str: The extracted string from the `<span>` tag.
 */

export const extractSpanContent = (htmlString: string): string => {
  // Regular expression to match the <span> tag and its content
  const spanRegex = /<span[^>]*>(.*?)<\/span>/g;
  // Replace the <span> tags with their inner content
  return htmlString.replace(spanRegex, "$1");
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
  const boldRegexWithColon = /\*\*(.*?:)\*\*/g; // Match content between ** that ends with a colon
  const boldRegexWithoutColon = /\*\*(.*?)\*\*/g; // Match content between ** that does not end with a colon

  // Replace the example sentence with an italic version
  let formattedText = text?.replace(regex, '<em>"$1"</em>');

  // Replace words between ** signs with a colon with a bold, underlined version and add a newline after
  formattedText = formattedText?.replace(
    boldRegexWithColon,
    '<br><span class="font-bold text-primaryText underline">$1</span><br>'
  );

  // Replace words between ** signs without a colon with a bold, underlined version without adding a newline
  formattedText = formattedText?.replace(
    boldRegexWithoutColon,
    '<span class="font-bold text-primaryText underline">$1</span>'
  );

  return formattedText;
};
