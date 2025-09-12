
from fastapi import FastAPI
from app.routes.routes import router as article_router
from fastapi.middleware.cors import CORSMiddleware
from app.logging.logging_config import setup_logger
    
# Setup logger for this module
logger = setup_logger(__name__)

app = FastAPI(
    title="ZeroMl",
    version="1.0.0",
    description=("Flow builder for machin learning"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(article_router,tags=["Articles"])

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 7860))
    logger.info(f" Server is running on http://localhost:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
