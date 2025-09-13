
from fastapi import APIRouter
from app.logging.logging_config import setup_logger
from fastapi import APIRouter, UploadFile, File, HTTPException
from huggingface_hub import HfApi
import os
from dotenv import load_dotenv
import os
from app.components.Upload.data_upload import upload_data

logger = setup_logger(__name__)

router = APIRouter()
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
HF_REPO_ID = "Thunder1245/Zero-ML-dataset-2"

api = HfApi()

@router.get("/")
async def home():
    logger.info("Home route accessed")
    return {"message": "ZeroMl is live!"}


@router.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    try:
        res = await upload_data(file)

        return res

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))



