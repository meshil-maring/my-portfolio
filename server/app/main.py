"""FastAPI application factory — docs/backend/01-architecture.md."""
import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import chat, health, ingest
from app.core.config import get_settings

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s"
)


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Portfolio AI backend", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "X-Ingest-Token"],
    )

    app.include_router(health.router, prefix="/api")
    app.include_router(chat.router, prefix="/api")
    app.include_router(ingest.router, prefix="/api")

    @app.exception_handler(RequestValidationError)
    async def _validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
        # Mirror the frontend contract: invalid bodies are 400 bad_request
        # (FastAPI's default is 422 with a different shape).
        return JSONResponse({"error": "bad_request"}, status_code=400)

    return app


app = create_app()
