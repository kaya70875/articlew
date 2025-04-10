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
    console.error(error);
    return url;
  }
};

/**
 * Fetches the current user from the session.
 * @returns user : object;
 */

export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};

/**
 * Gets current word from the URL.
 * @returns currentWord : string;
 */
export const useCurrentWord = () => {
  const params = useSearchParams();
  return params.get("word") || "";
};

// utils/scrollToTop.js
export const scrollToTop = (behavior = "smooth" as ScrollBehavior) => {
  window.scrollTo({
    top: 0,
    behavior: behavior,
  });
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
    (match) =>
      `<span class="font-bold underline text-primaryBlue ${className}">${match}</span>`
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
