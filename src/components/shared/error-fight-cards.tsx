import Image from "next/image";
import Link from "next/link";
import { routesConfig } from "@/config/routes-config";
import errorImg from "@/public/images/error.png";

type ErrorFightCardsProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorFightCards({
  message,
  onRetry,
}: ErrorFightCardsProps) {
  const isNetworkError = message.toLowerCase().includes("network");

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <Image
        src={errorImg}
        alt="error"
        width={200}
        height={200}
        priority
        className="h-auto w-auto"
      />
      <p className="mb-5 text-2xl font-bold uppercase text-red-500">
        {isNetworkError
          ? "Network error occurred. Please check your connection and try again."
          : `An error occurred: ${message}`}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
        >
          Retry
        </button>
      )}
      <Link
        href={routesConfig.root}
        className="mt-4 rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
