from services.utils.helpers import make_httpx_request, highlight_corrections, extract_paraphrase_sentences, parse_AI_response
import asyncio

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
            "content": f"Analyze the sentence: '{sentence}' with a focus on the word '{word}'. Explain its role, purpose, and meaning in the sentence in simple terms. Provide an example of a similar sentence using the word. Suggest an alternative way to rewrite the sentence with the same meaning. Keep the response clear and concise."
        }
    ]

    response_text = await make_httpx_request(api_key, messages)
    final_answer = parse_AI_response(response_text, messages)

    return final_answer

async def fix_grammar_errors(sentence : str, api_key : str) -> str:
    messages = [
        {
            "role": "user",
            "content": f"Identify and fix any grammar errors in the following sentence '{sentence}'. If the sentence is already correct, say nothing to fix. Provide the corrected version in plain text without additional explanations. Return only corrected sentence."
        }
    ]

    response_text = await make_httpx_request(api_key, messages)
    final_answer = parse_AI_response(response_text, messages)

    # Extract the corrected texts from the response
    original_text, corrected_text = await asyncio.to_thread(highlight_corrections, sentence, final_answer)

    return original_text, corrected_text

async def paraphrase(sentence : str, api_key : str, context: str = 'casual') -> str:
    messages = [
        {
            "role": "user",
            "content": f"Paraphrase the following sentence in a {context} way '{sentence}'. Give me five different examples and provide only examples in plain text without additional explanations. Do not say 'Sure' or 'Of course' at the beginning and do not say anything except your answer."
        }
    ]

    response_text = await make_httpx_request(api_key, messages)
    final_answer = parse_AI_response(response_text, messages)

    # Ensure the final answer is clean and does not contain any tags
    final_answer = await asyncio.to_thread(extract_paraphrase_sentences, final_answer)
    return final_answer

async def compare_words(word_1 : str, word_2 : str, api_key : str) -> str:

    """
    Compare two words and provide examples of how each word is used in a sentence.
    Args:
        word_1 (str): The first word to compare.
        word_2 (str): The second word to compare.
        api_key (str): The API key for the Hugging Face model.
    Returns:
        str: The comparison of the two words with examples
    """

    messages = [
        {
            "role": "user",
            "content": f"Compare the words '{word_1}' and '{word_2}'. Explain their similarities and differences. Provide examples of how each word is used in a sentence. Keep the response clear and concise. Response as a json format. here an example json format : ```json {{ \"similarities\": \"Both 'go' and 'back' are verbs that can indicate movement or direction. They can be used in similar contexts, such as traveling from one place to another.\", \"differences\": \"'Go' is a verb that generally means to move from a place, often towards a destination, while 'back' can function as both a verb and an adverb. 'Back' as a verb means to return to a previous place, and as an adverb, it indicates direction or movement in the opposite direction.\", \"examples_go\": [ \"I will go to the store to buy groceries.\", \"The train goes to the city center at 8 AM.\" ], \"examples_back\": [ \"She went back home after the party.\", \"He turned back when he heard a strange noise.\" ] }} ```"
        }
    ]

    response_text = await make_httpx_request(api_key, messages, parameters={
        'temperature': 0.7,
    })
    final_answer = parse_AI_response(response_text, messages)

    return final_answer