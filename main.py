from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import ValidationError
from app.ai_service import generate_daily_plan
from app.schemas import PlanRequest, PlanResponse
import os

load_dotenv()

app = FastAPI(title="Daily AI Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Daily AI Planner API'sine Hoş Geldiniz! Sistem aktif."}

@app.post("/plan", response_model=PlanResponse)
def create_plan(request: PlanRequest):
    user_input = request.user_input.strip()
    try:
        plan_data = generate_daily_plan(user_input)
        return PlanResponse.parse_obj(plan_data)
    except ValidationError as error:
        raise HTTPException(status_code=502, detail=f"Yapay zeka yanıtı beklenen formatta değil: {error}")
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception:
        raise HTTPException(status_code=502, detail="Plan oluşturulurken sunucu hatası oluştu.")
