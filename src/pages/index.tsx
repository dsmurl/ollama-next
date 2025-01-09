import {Geist, Geist_Mono} from "next/font/google";
import {ChatBox} from "@/components/ChatBox";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-10 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatBox/>
      </main>
    </div>
  );
}
