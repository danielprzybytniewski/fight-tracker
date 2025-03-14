"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center w-fit text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
      aria-label="Back button"
    >
      <ArrowLeft className="w-7 h-7" aria-label="Arrow left icon" />
    </button>
  );
}
