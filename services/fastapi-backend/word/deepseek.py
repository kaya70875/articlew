import httpx

async def analyze_word(word: str, api_key: str):
    messages = [
        {
            "role": "user",
            "content": f"Can you analyze the word '{word}' and give an example of its usage? Do not analysis word's origin and please keep it short. Do not say 'Sure' or 'Of course' at the beginning and do not say anything except your answer. Additionally provide your thinking process in <think></think> tags."
        }
    ]

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "inputs": messages[0]["content"],
                "parameters": {
                    "temperature": 0.2,
                }
            }
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        completion = response.json()

        response_text = completion[0]["generated_text"]

        if "<think>" in response_text:
            final_answer = response_text.split("</think>")[-1].strip()
        else:
            final_answer = response_text

        return final_answer