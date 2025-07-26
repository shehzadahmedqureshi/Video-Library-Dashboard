import os
import ssl
from typing import List, AsyncGenerator
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from contextlib import asynccontextmanager
from models import Base, Video
from schemas import VideoCreate, VideoResponse

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the .env file")

# SSL context for Neon
ssl_context = ssl.create_default_context()

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    connect_args={"ssl": ssl_context}
)

# Async session maker
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Dependency
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

# Function to initialize database tables
async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_models()  # your DB setup
    yield  # continue running the app

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get all videos
@app.get("/videos", response_model=List[VideoResponse])
async def get_videos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Video))
    videos = result.scalars().all()
    return videos

# Create a new video
@app.post("/create-video", response_model=VideoResponse)
async def create_video(video_data: VideoCreate, db: AsyncSession = Depends(get_db)):
    video = Video(**video_data.model_dump(mode="json"))
    db.add(video)
    await db.commit()
    await db.refresh(video)
    return video
