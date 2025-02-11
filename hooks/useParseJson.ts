import { useEffect, useState } from "react";

export const useParseJson = (json: string) => {
  const [parsedJson, setParsedJson] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    try {
      if (!json) return;

      const jsonString = json.replace(/^.*?```json\n|\n```$/g, "");
      const response = JSON.parse(jsonString);
      setParsedJson(response);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      setParsedJson(null);
    }
  }, [json]);

  return parsedJson;
};
