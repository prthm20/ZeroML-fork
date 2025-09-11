from fastapi import APIRouter


router = APIRouter()


@router.get("/")
async def home():
    return {"message": "ZeroML main server is live!"}


