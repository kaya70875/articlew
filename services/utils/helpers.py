import re
import httpx
from difflib import SequenceMatcher
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

def highlight_corrections(original, corrected):
    # Use SequenceMatcher to find differences
    matcher = SequenceMatcher(None, original.split(), corrected.split())
    
    original_highlighted = []
    corrected_highlighted = []

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "replace":  # Words replaced
            original_text = " ".join(original.split()[i1:i2])
            corrected_text = " ".join(corrected.split()[j1:j2])
            original_highlighted.append(f"<span style='color:#E76047; font-weight:bold;'>{original_text}</span>")
            corrected_highlighted.append(f"<span style='color:#69B23E; font-weight:bold;'>{corrected_text}</span>")
        elif tag == "delete":  # Words deleted in corrected version
            original_text = " ".join(original.split()[i1:i2])
            original_highlighted.append(f"<span style='color:#E76047; font-weight:bold;'>{original_text}</span>")
        elif tag == "insert":  # Words inserted in corrected version
            corrected_text = " ".join(corrected.split()[j1:j2])
            corrected_highlighted.append(f"<span style='color:#69B23E; font-weight:bold;'>{corrected_text}</span>")
        elif tag == "equal":  # No changes
            unchanged_text = " ".join(original.split()[i1:i2])
            original_highlighted.append(unchanged_text)
            corrected_highlighted.append(unchanged_text)
    
    return " ".join(original_highlighted), " ".join(corrected_highlighted)

def extract_paraphrase_sentences(results):
    extracted_list = []
    for i in range(1,6):
        find_first = results.find(f"{i}.")
        find_next = results.find(f"{i + 1}.")
        extract = results[find_first + 3:find_next]
        
        extracted_list.append(extract)
    
    return extracted_list

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
            },
            timeout=30.0 #Increased timeout
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        completion = response.json()

        response_text = completion[0]["generated_text"]
        return response_text