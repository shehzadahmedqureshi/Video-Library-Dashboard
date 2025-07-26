from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import ConfigDict

class VideoCreate(BaseModel):
    title: str = Field(..., min_length=1)
    tags: Optional[List[str]] = []
    thumbnail_url: Optional[HttpUrl] = None
    duration: Optional[int] = 0
    views: Optional[int] = 0

    @field_validator("thumbnail_url", mode="before")
    @classmethod
    def empty_string_to_none(cls, url):
        if url == "":
            return None
        return url

class VideoResponse(VideoCreate):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)