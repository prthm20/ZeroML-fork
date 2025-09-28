
from fastapi import APIRouter
from app.logging.logging_config import setup_logger
from fastapi import APIRouter, UploadFile, File, HTTPException
from huggingface_hub import HfApi
import os
from dotenv import load_dotenv
import os
from app.components.Upload.data_upload import upload_data
from app.components.Upload.upload import upload
from app.components.Cleaning.clean import clean_data
from app.utils.session import SESSIONS
from fastapi import Body    
logger = setup_logger(__name__)

router = APIRouter()
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
HF_REPO_ID = "prthm20/ZeoMl"

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


@router.get("/get-file")
async def get_file(filename: str):
    from app.components.ExtractFile.extract import get_file as extract_file
    try:
        res = await extract_file(filename)

        return res

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_2(file: UploadFile = File(...)):
    try:
        res = await upload(file)

        return res

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clean-data")
async def clean(session_id: str = Body(...), instruction: str = Body(...)):
    try:
        res = await clean_data(session_id, instruction)

        return res

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save-cleaned-file")
async def save_cleaned_file(session_id: str = Body(...)):
    if session_id not in SESSIONS:
        raise HTTPException(status_code=404, detail="Invalid session_id")
    
    df = SESSIONS[session_id]
    filename = f"cleaned_{session_id}.csv"
    df.to_csv(filename, index=False)

    return {"message": "File saved successfully", "path": filename}