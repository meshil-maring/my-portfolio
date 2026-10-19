"""Cloudflare R2 mirror (S3-compatible) for raw document artifacts.

Optional by design: ingestion works without R2 (Postgres holds the text);
R2 keeps the original artifact for audit/republish. Blocking boto3 calls —
call via asyncio.to_thread from async code. Any S3-compatible store works
(B2, MinIO, Wasabi): only the endpoint env changes.
"""
import boto3
from botocore.config import Config

from app.core.config import get_settings


def _client():
    settings = get_settings()
    return boto3.client(
        "s3",
        endpoint_url=settings.r2_endpoint,
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


def mirror_raw(key: str, body: bytes, content_type: str = "application/octet-stream") -> str | None:
    """Uploads the raw artifact. Returns the object key, or None when R2 is off."""
    settings = get_settings()
    if not settings.r2_configured:
        return None
    _client().put_object(
        Bucket=settings.r2_bucket, Key=key, Body=body, ContentType=content_type
    )
    return key
