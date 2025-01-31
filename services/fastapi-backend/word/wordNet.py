import nltk
from nltk.corpus import wordnet
from nltk.corpus import brown
from collections import Counter

# Ensure the necessary resources are downloaded
nltk.download('brown')
nltk.download('universal_tagset')

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
            "synonyms": [lemma.name().replace('_' , ' ') for lemma in synset.lemmas()],
            "examples": synset.examples() if synset.examples() else []
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

def most_common_pos(word):
    # Normalize the word to lowercase
    word = word.lower()
    
    # Get tagged words from the Brown corpus using the universal tagset
    tagged_words = brown.tagged_words(tagset='universal')
    
    # Filter tags for the specified word
    word_tags = [tag for w, tag in tagged_words if w.lower() == word]
    
    # If the word is not found in the corpus
    if not word_tags:
        return None
    
    # Count the frequency of each tag
    tag_counts = Counter(word_tags)
    
    # Return the most common tag
    return tag_counts.most_common(1)[0]