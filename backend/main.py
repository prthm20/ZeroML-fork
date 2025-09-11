from fastapi import FastAPI
from app.routes.routes import router as article_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ZeroML backend",
    version="1.0.0",
    description=("An API to handle all the complex logic for ZeroML"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(article_router, tags=["Articles"])

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 7860))
    print("Server is live at http://localhost:7860!")
    uvicorn.run(app, host="0.0.0.0", port=port)