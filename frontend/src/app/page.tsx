// app/page.tsx
import React from "react";
import { getVideos } from "@/lib/api";
import SortableVideoList from "@/components/SortableVideoList";

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <main className="p-6">
      <SortableVideoList initialVideos={videos} />
    </main>
  );
}
