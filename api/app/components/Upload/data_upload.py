from dotenv import load_dotenv
import os
from huggingface_hub import HfApi
import tempfile
from pathlib import Path
from fastapi import HTTPException
import pandas as pd
import pyreadstat
from huggingface_hub.utils import HfHubHTTPError as HTTPError

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

HF_DATA_REPO = os.getenv("HF_DATA_REPO")

api = HfApi()

file_types = [
    ".csv",
    ".xls",
    ".xlsx",
    ".json",
    ".parquet",
    ".h5",
    ".feather",
    ".orc",
    ".dta",
    ".sas7bdat",
    ".sav",
    ".html"
]

allowed_file_types = set(file_types)

READERS = {
    ".csv": pd.read_csv,
    ".xls": pd.read_excel,
    ".xlsx": pd.read_excel,
    ".json": pd.read_json,
    ".parquet": pd.read_parquet,
    ".h5": pd.read_hdf,
    ".feather": pd.read_feather,
    ".orc": pd.read_orc,
    ".dta": pd.read_stata,
    ".sas7bdat": pd.read_sas,
    ".sav": lambda path: pyreadstat.read_sav(path)[0],
    ".html": lambda path: pd.read_html(path)[0],
}


async def upload_data(file):
    try:
        try:
            api.repo_info(repo_id=HF_DATA_REPO, repo_type="dataset", token=HF_TOKEN)
        except HTTPError as e:
            print("Repo does not exist, creating...")
            api.create_repo(repo_id=HF_DATA_REPO, repo_type="dataset", token=HF_TOKEN)
            print("Repo created!")
            print("uploading a file.")
            
        # Save to temporary file
        suffix = Path(file.filename).suffix.lower()
        if suffix not in READERS:
            raise HTTPException(status_code=400, detail=f"File type {suffix} not supported")

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_f:
            content = await file.read()
            tmp_f.write(content)
            tmp_path = Path(tmp_f.name)

        # Read file into DataFrame
        try:
            df = READERS[suffix](str(tmp_path))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not parse {suffix} file: {e}")

        # Special case for HTML: merge multiple tables if found
        if suffix == ".html" and isinstance(df, list):
            df = pd.concat(df, ignore_index=True)

        # Convert to CSV
        csv_path = tmp_path.with_suffix(".csv")
        df.to_csv(csv_path, index=False)

        # Upload to HuggingFace
        res = api.upload_file(
            path_or_fileobj=str(csv_path),
            path_in_repo=f"uploads/{Path(file.filename).stem}.csv",
            repo_id=HF_DATA_REPO,
            repo_type="dataset",
            token=HF_TOKEN,
        )

        # Cleanup temp files
        tmp_path.unlink(missing_ok=True)
        csv_path.unlink(missing_ok=True)

        return {"message": "File uploaded successfully", "hf_response": res}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

        
                
                
            
            
                
            
                    
            
            
            
            
    