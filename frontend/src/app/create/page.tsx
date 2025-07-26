"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVideo } from "@/lib/api";

export default function CreateVideo() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://picsum.photos/seed/video50/300/200"
  );
  const [duration, setDuration] = useState<number>(90);
  const [views, setViews] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
  }>({});

  const router = useRouter();

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // stop submission if errors
    }

    setLoading(true);
    try {
      await createVideo({
        title,
        tags,
        thumbnail_url: thumbnailUrl,
        duration,
        views,
      });
      router.push("/");
    } catch (e) {
      alert("Failed to create video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Video</h1>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold">
          Title *
        </label>
        <input
          id="title"
          className={`w-full border px-3 py-2 rounded mt-1 ${
            errors.title ? "border-red-500" : ""
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-red-600 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tagInput" className="block font-semibold">
          Tags
        </label>
        <div className="flex gap-2 mt-1">
          <input
            id="tagInput"
            className="flex-1 border px-3 py-2 rounded"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            onClick={addTag}
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="bg-blue-200 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Thumbnail URL */}
      <div className="mb-4">
        <label htmlFor="thumbnailUrl" className="block font-semibold">
          Thumbnail URL
        </label>
        <input
          id="thumbnailUrl"
          className={`w-full border px-3 py-2 rounded mt-1`}
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label htmlFor="duration" className="block font-semibold">
          Duration (seconds)
        </label>
        <input
          id="duration"
          type="number"
          className="w-full border px-3 py-2 rounded mt-1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      {/* Views */}
      <div className="mb-6">
        <label htmlFor="views" className="block font-semibold">
          Views
        </label>
        <input
          id="views"
          type="number"
          className="w-full border px-3 py-2 rounded mt-1"
          value={views}
          onChange={(e) => setViews(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Video"}
      </button>
    </main>
  );
}
