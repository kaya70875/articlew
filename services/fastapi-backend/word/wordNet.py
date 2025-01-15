from nltk.corpus import wordnet
import nltk

nltk.download('wordnet')
nltk.download('omw-1.4')

def get_word_info(word):
    synsets = wordnet.synsets(word)
    if synsets:
        definition = synsets[0].definition()
        examples = synsets[0].examples()
        return {
            "definition": definition,
            "examples": examples
        }
    return None

def get_word_info_extended(word):
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

# Test the function
word = "test"
result = get_word_info_extended(word)
print(result)