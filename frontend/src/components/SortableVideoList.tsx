"use client";

import React, { useState, useMemo } from "react";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";

type Props = {
  initialVideos: Video[];
};

export default function SortableVideoList({ initialVideos }: Props) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedVideos = useMemo(() => {
    return [...initialVideos].sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [sortOrder, initialVideos]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {sortOrder === "desc" ? "Newest Videos" : "Oldest Videos"}
        </h1>
        <select
          className="border px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
