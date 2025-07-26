import os
import ssl
import json
import asyncio
import uuid
from pathlib import Path
from dateutil import parser as date_parser
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, AsyncEngine
from sqlalchemy.orm import sessionmaker
from models import Base, Video
from dotenv import load_dotenv

load_dotenv()  # This loads environment variables from .env into os.environ

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("No DATABASE_URL in environment")

ssl_context = ssl.create_default_context()
engine = create_async_engine(DATABASE_URL, connect_args={"ssl": ssl_context})
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Add this function to create tables
async def create_tables(engine: AsyncEngine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def load_videos():
    async with async_session() as session:
        # Load JSON
        file_path = Path(__file__).parent / "videos.json"
        try:
            with open(file_path) as f:
                data = json.load(f)
        except FileNotFoundError:
            print(f"File not found: {file_path}")
            return
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return

        for video in data.get("videos", []):
            video_obj = Video(
                id=uuid.uuid4(),  # generate new UUID here
                title=video["title"],
                thumbnail_url=video["thumbnail_url"],
                created_at=date_parser.parse(video["created_at"]),  # parse ISO datetime string
                duration=video["duration"],
                views=video["views"],
                tags=video["tags"]
            )
            session.add(video_obj)
        await session.commit()

# Add a main async function to run both steps in the same event loop
async def main():
    await create_tables(engine)
    await load_videos()

if __name__ == "__main__":
    asyncio.run(main())