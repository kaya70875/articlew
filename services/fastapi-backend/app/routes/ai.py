from fastapi import APIRouter
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoModelForSeq2SeqLM
from word.paraphrase import paraphrase
from app.models.paraphraseModel import ParaphraseModel as pModel

router = APIRouter()

@router.get("/generate/{word}")
async def generate_response(word: str):

    # Load fine-tuned model and tokenizer
    model_path = "C:\\Users\\ahmet\\OneDrive\\Desktop\\LWA\\next-lwa\\LearnWithArticlesNext\\services\\fastapi-backend\\fine-tuning\\fine_tuned_model"  # Adjust the path to where your model is saved
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)

    prompt = f"Analyze the word '{word}' for its meaning and usage in English. Here is the analysis:\n"
    inputs = tokenizer(prompt, return_tensors="pt")
    
    outputs = model.generate(
        **inputs,
        max_length=100,
        no_repeat_ngram_size=2,
    )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = response.replace(prompt, "").strip()  # Remove the prompt text
    return {"response": response}

@router.get("/paraphrase/{sentence}" , response_model=pModel)
async def generate_paraphrase(sentence : str):
    #Choose a device (cpu or cuda)
    device = "cpu"

    #Load model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base")
    model = AutoModelForSeq2SeqLM.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base").to(device)

    results = paraphrase(question=sentence , model=model, tokenizer=tokenizer, device=device)
    return {"paraphrase" : results}