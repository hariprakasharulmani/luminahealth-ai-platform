from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class VitalInput(BaseModel):
    bloodPressure: float
    glucoseLevel: float
    heartRate: float
    bmi: float

@app.post("/predict")
def predict(vital: VitalInput):

    # Temporary logic (replace later with real ML model)
    risk_score = (
        vital.bloodPressure * 0.01 +
        vital.glucoseLevel * 0.02 +
        vital.bmi * 0.03
    ) / 5

    risk_score = min(risk_score, 1.0)

    if risk_score < 0.3:
        level = "LOW"
    elif risk_score < 0.6:
        level = "MEDIUM"
    else:
        level = "HIGH"

    return {
        "riskScore": risk_score,
        "riskLevel": level
    }