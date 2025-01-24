from services.utils.helpers import make_httpx_request

async def analyze_word(word: str, api_key: str):
    messages = [
        {
            "role": "user",
            "content": f"Can you analyze the word '{word}' and give an example of its usage? Do not analysis word's origin and please keep it short. Do not say 'Sure' or 'Of course' at the beginning and do not say anything except your answer. Additionally provide your thinking process in <think></think> tags."
        }
    ]

    response_text = await make_httpx_request(api_key, messages)

    if "<think>" in response_text:
        final_answer = response_text.split("</think>")[-1].strip()
    else:
        final_answer = response_text

    return final_answer

async def analyze_sentence_with_word(sentence : str, word : str, api_key: str):
    messages = [
        {
            "role": "user",
            "content": f"Analyze the sentence: {sentence} Focus on the word {word}. Explain its role and purpose in the sentence in simple terms. Keep the answer short and straightforward. Do not say 'Sure' or 'Of course' at the beginning and do not say anything except your answer. Additionally provide your thinking process in <think></think> tags."
        }
    ]

    response_text = await make_httpx_request(api_key, messages, )

    if "<think>" in response_text:
        final_answer = response_text.split("</think>")[-1].strip()
    else:
        final_answer = response_text

    return final_answer