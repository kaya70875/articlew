from fastapi import APIRouter , HTTPException
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from word.paraphrase import paraphrase
from app.models.paraphraseModel import ParaphraseModel as pModel
from word.deepseek import analyze_word , analyze_sentence_with_word
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

#Choose a device (cpu or cuda)
device = "cuda" if torch.cuda.is_available() else "cpu"

#Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base")
model = AutoModelForSeq2SeqLM.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base").to(device)

@router.get("/generate/{word}")
async def generate_response(word: str):
    api_key = os.getenv('HUGGING_FACE_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    try:
        results = await analyze_word(word, api_key)
        return {"response": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analysis/{sentence}/{word}")
async def analyze_sentence(sentence: str, word: str):
    api_key = os.getenv('HUGGING_FACE_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")
    try:
        results = await analyze_sentence_with_word(sentence, word, api_key)
        return {"response": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/paraphrase/{sentence}" , response_model=pModel)
async def generate_paraphrase(sentence : str):
    results = paraphrase(question=sentence , model=model, tokenizer=tokenizer, device=device)
    return {"paraphrase" : results}