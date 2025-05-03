"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import errorImg from "@/public/images/error.png";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-2 text-center text-red-500 dark:bg-gray-900">
      <Image
        src={errorImg}
        alt="error"
        width={200}
        height={200}
        priority
        className="h-auto w-auto"
      />
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-6 text-center text-lg">
        We encountered an unexpected error. Please try again later.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
        <button
          onClick={() => router.push("/")}
          className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          Go To Homepage
        </button>
      </div>
    </div>
  );
}
