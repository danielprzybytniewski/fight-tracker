"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500 text-center
    px-2"
    >
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg text-center mb-6">
        We encountered an unexpected error. Please try again later.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
