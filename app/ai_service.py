import google.generativeai as genai
import os
import json
from app.prompts import SYSTEM_PROMPT

def generate_daily_plan(user_input: str) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY bulunamadı. Lütfen .env dosyanızı kontrol edin.")

    genai.configure(api_key=api_key)
    
    generation_config = genai.types.GenerationConfig(
        response_mime_type="application/json",
    )

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=SYSTEM_PROMPT,
        generation_config=generation_config
    )

    response = model.generate_content(user_input)
    
    try:
        parsed = json.loads(response.text)
    except json.JSONDecodeError as error:
        raise ValueError(f"Yapay zeka geçerli JSON döndüremedi: {error}. Ham yanıt: {response.text}")

    if not isinstance(parsed, dict):
        raise ValueError("Yapay zeka yanıtı bir JSON nesnesi olmalı.")

    return parsed
