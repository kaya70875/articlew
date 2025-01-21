import re

def extract_sentence(results, word):
    regex = rf'\b[A-Z][^.!?]*?\b{word}\b[^.!?]*[.!?]'
    new_results = []
    
    for text in results:
        extracted_sentences = re.findall(regex, text['text'], re.IGNORECASE)
        new_text = ' '.join(extracted_sentences)
        new_text_dict = {**text, 'text': new_text}  # Preserve other fields and update 'text'
        new_results.append(new_text_dict)
        
    return new_results