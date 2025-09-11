


from fastapi import APIRouter
from app.logging.logging_config import setup_logger
from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from huggingface_hub import HfApi
import os
import tempfile

logger = setup_logger(__name__)

router = APIRouter()

HF_TOKEN = "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"  # Store your token in env variable
HF_REPO_ID = "prthm20/ZeoMl"  # Replace with your repo name

api = HfApi()



@router.get("/")
async def home():
    logger.info("Home route accessed")
    return {"message": "ZeroMl is live!"}

@router.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Load file into pandas to validate
        if file.filename.endswith(".csv"):
            df = pd.read_csv(tmp_path)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(tmp_path)
        else:
            raise HTTPException(status_code=400, detail="File must be .csv or .xlsx")

        # Save as CSV for Hugging Face
        save_path = tmp_path + ".csv"
        df.to_csv(save_path, index=False)

        # Upload to Hugging Face repo
        api.upload_file(
            path_or_fileobj=save_path,
            path_in_repo=f"uploads/{file.filename}.csv",
            repo_id=HF_REPO_ID,
            repo_type="dataset",
            token=HF_TOKEN,
        )

        return {"message": "File uploaded successfully", "repo": HF_REPO_ID}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



