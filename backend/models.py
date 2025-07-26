from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, Integer, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

Base = declarative_base()

class Video(Base):
    __tablename__ = "videos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    thumbnail_url = Column(String, default="https://picsum.photos/seed/video50/300/200")
    duration = Column(Integer, default=0)
    views = Column(Integer, default=0)
    tags = Column(JSON, default=lambda: [])
    created_at = Column(DateTime(timezone=True), server_default=func.now())