import re
import httpx
from typing import Optional

def extract_sentence(results, word):
    regex = rf'\b[A-Z][^.!?]*?\b{word}\b[^.!?]*[.!?]'
    new_results = []
    
    for text in results:
        extracted_sentences = re.findall(regex, text['text'], re.IGNORECASE)
        new_text = ' '.join(extracted_sentences)
        new_text_dict = {**text, 'text': new_text}  # Preserve other fields and update 'text'
        new_results.append(new_text_dict)
        
    return new_results

async def make_httpx_request(api_key : str, messages: list[dict], parameters : Optional[dict] = None) -> str:

    """Make a request to the Hugging Face inference API.

    Args:
        api_key (str): The API key for authentication
        messages (list[dict]): List of message dictionaries like user , content
        parameters (Optional): Request parameters like temperature and max_new_tokens

    Returns:
        str: Generated text response
    """

    default_parameters = {
        "temperature" : 0.2,
    }

    request_parameters = {**default_parameters, **(parameters or {})}
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "inputs": messages[0]["content"],
                "parameters": request_parameters
            }
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        completion = response.json()

        response_text = completion[0]["generated_text"]
        return response_text