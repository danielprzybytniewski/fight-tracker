import Image from "next/image";
import errorImg from "@/public/images/error.png";
import Link from "next/link";

type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorFightCards({ message, onRetry }: ErrorProps) {
  const isNetworkError = message.toLowerCase().includes("network");

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <Image
        src={errorImg}
        alt="error"
        width={200}
        height={200}
        priority
        className="w-auto h-auto"
      />
      <p className="mb-5 text-2xl font-bold uppercase text-red-500">
        {isNetworkError
          ? "Network error occurred. Please check your connection and try again."
          : `An error occurred: ${message}`}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 font-bold rounded text-white bg-red-500 hover:bg-red-600"
        >
          Retry
        </button>
      )}
      <Link
        href="/"
        className="mt-4 px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
