import React from "react";

type TagBadgeProps = {
  tag: string;
};

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-1">
      {tag}
    </span>
  );
}
