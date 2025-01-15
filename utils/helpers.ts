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
