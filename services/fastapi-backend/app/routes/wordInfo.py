from fastapi import APIRouter
from nltk.corpus import wordnet
import nltk
from app.models.word_info import WordInfoResponse

nltk.download('wordnet')
nltk.download('omw-1.4')

router = APIRouter()

def get_word_info_extended(word : str) -> WordInfoResponse:
    # Retrieve synsets for the word (could be adjective, adverb, verb, noun, etc.)
    synsets = wordnet.synsets(word)
    
    # Prepare a dictionary to hold information
    info = {
        "adjective": [],
        "adverb": [],
        "verb": [],
        "noun": [],
    }
    
    # Loop through each synset to check its part of speech
    for synset in synsets:
        pos = synset.pos()
        word_info = {
            "definition": synset.definition(),
            "synonyms": [lemma.name() for lemma in synset.lemmas()]
        }
        
        if pos == 'a':  # Adjective
            info["adjective"].append(word_info)
        elif pos == 'r':  # Adverb
            info["adverb"].append(word_info)
        elif pos == 'v':  # Verb
            info["verb"].append(word_info)
        elif pos == 'n':  # Noun
            info["noun"].append(word_info)
    
    return info


@router.get("/wordInfo/{word}" , response_model=WordInfoResponse)
async def get_word_info(word: str):
    # Call the function to get word information
    word_info = get_word_info_extended(word)
    return word_info