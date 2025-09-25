from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import uuid
from app.utils.session import SESSIONS



async def upload(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)  # read CSV
        session_id = str(uuid.uuid4())
        SESSIONS[session_id] = df
        return {
            "message": "File uploaded successfully",
            "session_id": session_id,
            "preview":  df.head().to_json(orient="records")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))