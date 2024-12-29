from fastapi import FastAPI
from app.routes.sentences import router as sentences_router

app = FastAPI()

# Register your routes
app.include_router(sentences_router, prefix="/api", tags=["Sentences"])

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
