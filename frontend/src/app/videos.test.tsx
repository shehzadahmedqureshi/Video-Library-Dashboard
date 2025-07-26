import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import VideosPage from "@/app/page"; // adjust if your path is different
import { getVideos } from "@/lib/api";

// Mock getVideos API
jest.mock("@/lib/api", () => ({
  getVideos: jest.fn(),
}));

// Mock the SortableVideoList client component to avoid async client errors in test
jest.mock("@/components/SortableVideoList", () => {
  return function MockSortableVideoList({
    initialVideos,
  }: {
    initialVideos: any[];
  }) {
    return (
      <div>
        {initialVideos.map((video) => (
          <div key={video.id}>{video.title}</div>
        ))}
      </div>
    );
  };
});

const mockVideos = [
  {
    id: "1",
    title: "Test Video 1",
    thumbnail_url: "https://example.com/thumb1.jpg",
    duration: 120,
    views: 1000,
    created_at: "2023-01-01T00:00:00Z",
    tags: ["funny", "music"],
  },
  {
    id: "2",
    title: "Test Video 2",
    thumbnail_url: "https://example.com/thumb2.jpg",
    duration: 90,
    views: 500,
    created_at: "2023-01-02T00:00:00Z",
    tags: [],
  },
];

describe("Video Page", () => {
  beforeEach(() => {
    (getVideos as jest.Mock).mockResolvedValue(mockVideos);
  });

  it("renders videos with titles", async () => {
    const element = await VideosPage();
    render(element);

    // Wait for the mocked video titles to appear
    await waitFor(() => {
      expect(screen.getByText("Test Video 1")).toBeInTheDocument();
      expect(screen.getByText("Test Video 2")).toBeInTheDocument();
    });
  });
});
