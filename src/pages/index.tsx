import { Geist, Geist_Mono } from "next/font/google";
import { ChatBox } from "@/components/ChatBox";
import { ModelType, useModels } from "@/hooks/useModels";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { currentModel, setCurrentModel, getModelList } = useModels();

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(event.target.value as ModelType);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-10 font-[family-name:var(--font-geist-sans)] relative`}
    >
      {/* Model Selection Dropdown - Positioned in top right */}
      <div className="fixed top-4 right-4 z-10">
        <select
          value={currentModel}
          onChange={handleModelChange}
          className="p-2 border border-gray-300 rounded text-black bg-white shadow-md"
        >
          {getModelList().map((modelOption) => (
            <option key={modelOption} value={modelOption}>
              {modelOption}
            </option>
          ))}
        </select>
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatBox />
      </main>
    </div>
  );
}
