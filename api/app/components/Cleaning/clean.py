from fastapi import  HTTPException, Body
from app.utils.session import SESSIONS
from openai import OpenAI
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))




async def clean_data(
    session_id: str = Body(...),
    instruction: str = Body(...)
):
    if session_id not in SESSIONS:
        raise HTTPException(status_code=404, detail="Invalid session_id")

    df = SESSIONS[session_id]

    prompt = f"""
    You are a Pandas coding assistant.
    Apply this cleaning instruction to a DataFrame called df.
    Instruction: {instruction}
    Output only valid Python code (no markdown).
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a Pandas coding assistant."},
            {"role": "user", "content": prompt},
        ]
    )

    code = response.choices[0].message.content.strip()

    if code.startswith("```"):
        code = code.split("```")[1]
        code = code.replace("python\n", "").strip()

    local_vars = {"df": df, "pd": pd}
    try:
        exec(code, {}, local_vars)
        df = local_vars["df"]
        SESSIONS[session_id] = df
    except Exception as e:
        return {"error": f"Error running code: {e}", "code": code}

    return {"message": "Cleaning applied", "code": code, "preview":  df.head().to_json(orient="records")}
