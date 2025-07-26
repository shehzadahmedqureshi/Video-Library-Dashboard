import { Video } from "@/types/video";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${BASE_URL}/videos`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

export async function createVideo(data: Partial<Video> & { title: string }) {
  const res = await fetch(`${BASE_URL}/create-video`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create video");
  return res.json();
}
