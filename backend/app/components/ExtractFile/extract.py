import os
import tempfile
import json
import requests
import pandas as pd
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

# Load .env file (make sure you have HF_TOKEN inside it)
load_dotenv()

router = APIRouter()

HF_REPO_ID = "prthm20/ZeoMl"  # your repo ID
HF_TOKEN = os.getenv("HF_TOKEN")  # Hugging Face API token
BASE_URL = f"https://huggingface.co/datasets/{HF_REPO_ID}/resolve/main/uploads"


@router.get("/get-file")
async def get_file(filename: str = Query(..., description="Filename to extract from Hugging Face dataset")):
    try:
        file_url = f"{BASE_URL}/{filename}.csv"

        headers = {}
        if HF_TOKEN:
            headers["Authorization"] = f"Bearer {HF_TOKEN}"

        response = requests.get(file_url, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=404, detail=f"File not found at {file_url}")

        # Save temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as tmp:
            tmp.write(response.content)
            tmp_path = tmp.name

        # Load with pandas
        df = pd.read_csv(tmp_path)

        # Clean data for JSON
        df = df.replace([float("inf"), float("-inf")], None)
        df = df.where(pd.notnull(df), None)

        json_str = df.head(50).to_json(orient="records", force_ascii=False, default_handler=str)
        records = json.loads(json_str)

        return {"filename": filename, "records": records}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")