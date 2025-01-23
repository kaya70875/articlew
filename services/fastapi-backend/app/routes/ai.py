from fastapi import APIRouter
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from huggingface_hub import InferenceClient
from word.paraphrase import paraphrase
from app.models.paraphraseModel import ParaphraseModel as pModel
from word.deepseek import analyze_word
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

@router.get("/generate/{word}")
async def generate_response(word: str):
    # Initialize the InferenceClient with your API key
    client = InferenceClient(api_key=os.getenv('HUGGING_FACE_API_KEY'))

    results = analyze_word(word , client)
    return {"response" : results}
    

@router.get("/paraphrase/{sentence}" , response_model=pModel)
async def generate_paraphrase(sentence : str):
    #Choose a device (cpu or cuda)
    device = "cpu"

    #Load model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base")
    model = AutoModelForSeq2SeqLM.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base").to(device)

    results = paraphrase(question=sentence , model=model, tokenizer=tokenizer, device=device)
    return {"paraphrase" : results}