from fastapi import APIRouter
from transformers import AutoTokenizer, AutoModelForCausalLM

router = APIRouter()

# Load fine-tuned model and tokenizer
model_path = "C:\\Users\\ahmet\\OneDrive\\Desktop\\LWA\\next-lwa\\LearnWithArticlesNext\\services\\fastapi-backend\\fine-tuning\\fine_tuned_model"  # Adjust the path to where your model is saved
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path)

@router.get("/generate/{word}")
async def generate_response(word: str):
    prompt = f"Analyze the word '{word}' for its meaning and usage in English. Here is the analysis:\n"
    inputs = tokenizer(prompt, return_tensors="pt")
    
    outputs = model.generate(
        **inputs,
        max_length=70,
        temperature=0.7,
        top_k=50,
        top_p=0.9,
        early_stopping=True
    )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = response.replace(prompt, "").strip()  # Remove the prompt text
    return {"response": response}