type Method = "POST" | "PUT" | "DELETE";

export const useSentenceCardActions = () => {
  const handleFavorites = async (
    sentence: string,
    userId: string,
    highlightedWord?: string,
    method: Method = "POST"
  ) => {
    try {
      const res = await fetch("/api/words/sentenceActions", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentence,
          userId,
          highlightedWord,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }
    } catch (e) {
      console.error(
        `There was an error adding the sentence to favorites: ${e}`
      );
    }
  };

  const readSentenceWithAI = async (sentence: string) => {
    try {
      const res = await fetch("/api/ai/ai-speaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentence,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }

      return await res.json();
    } catch (e) {
      console.error(`There was an error reading the sentence with AI: ${e}`);
    }
  };
  return { handleFavorites, readSentenceWithAI };
};
