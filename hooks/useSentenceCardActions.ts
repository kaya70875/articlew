type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const useSentenceCardActions = () => {
  const handleFavorites = async (sentence: string, userId: string , method : Method = 'POST') => {
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
      console.error(`There was an error adding the sentence to favorites: ${e}`);
    }
  };
  return { handleFavorites };
};
