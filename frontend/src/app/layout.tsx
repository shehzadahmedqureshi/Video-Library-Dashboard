import "./globals.css";
import React from "react";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        {/* Header */}
        <header className="bg-white shadow-md px-8 py-6 mb-8 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight hover:underline transition-colors duration-150">
                Video Library
              </h1>
            </Link>
            <nav className="flex gap-6 text-base">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-700 hover:underline font-medium transition-colors duration-150"
              >
                Home
              </Link>
              <Link
                href="/create"
                className="text-gray-700 hover:text-blue-700 hover:underline font-medium transition-colors duration-150"
              >
                Add New Video
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-8 py-8 bg-white rounded-lg shadow-sm">
          {children}
        </main>
      </body>
    </html>
  );
}
