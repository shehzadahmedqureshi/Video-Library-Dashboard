import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateVideo from "./page";
import { createVideo } from "@/lib/api";
import { useRouter } from "next/navigation";

// Mock the createVideo API call
jest.mock("@/lib/api", () => ({
  createVideo: jest.fn(),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("CreateVideo Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<CreateVideo />);

    expect(screen.getByLabelText(/Title \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Thumbnail URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration \(seconds\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Views/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Video/i)).toBeInTheDocument();
  });

  it("shows an error message if title is missing", async () => {
    render(<CreateVideo />);
    fireEvent.click(screen.getByText(/Create Video/i));
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });

  it("calls createVideo with correct data", async () => {
    const mockCreateVideo = createVideo as jest.Mock;
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<CreateVideo />);

    fireEvent.change(screen.getByLabelText(/Title \*/i), {
      target: { value: "Test Video" },
    });
    fireEvent.change(screen.getByLabelText(/Thumbnail URL/i), {
      target: { value: "https://example.com/thumb.jpg" },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText(/Views/i), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText(/Create Video/i));

    await waitFor(() => {
      expect(mockCreateVideo).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Video",
          thumbnail_url: "https://example.com/thumb.jpg",
          duration: 120,
          views: 10,
          tags: expect.any(Array),
        })
      );
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
