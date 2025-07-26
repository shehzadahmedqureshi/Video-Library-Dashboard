import React from "react";
import { Video } from "@/types/video";
import TagBadge from "./TagBadge";
import { formatDate } from "@/utils/formatDate";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
  return (
    <div className="border rounded shadow-sm p-4 bg-white">
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="font-semibold text-lg text-black">{video.title}</h2>
      <p className="text-sm text-gray-500">
        Created: {formatDate(video.created_at)}
      </p>
      <p className="text-sm text-gray-500">
        Duration: {Math.floor(video.duration / 60)}m {video.duration % 60}s
      </p>
      <p className="text-sm text-gray-500">
        {Intl.NumberFormat("en", { notation: "compact" }).format(video.views)}{" "}
        views
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {video.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
