"""Minimal FastAPI backend for Collectible Appraisal.

Frontend is fully stubbed with mock services, this backend only exists to
satisfy the platform's process manager and expose a health endpoint.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Collectible Appraisal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "collectible-appraisal"}


@app.get("/api/")
async def root():
    return {"message": "Collectible Appraisal API — frontend stubbed"}
