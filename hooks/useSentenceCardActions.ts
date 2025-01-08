type Method = "POST" | "PUT" | "DELETE";

export const useSentenceCardActions = () => {
  const handleFavorites = async (
    sentence: string,
    userId: string,
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

  const getAISuggestions = async (word : string) => {
    try {
      const res = await fetch("/api/ai-word-assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return errorData;
      }
      
      return await res.json();

    } catch (e) {
      console.error(
        `There was an error getting the AI suggestions: ${e}`
      );
    }
  }

  return { handleFavorites , getAISuggestions};
};
